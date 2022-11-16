import fetch from 'isomorphic-unfetch';

import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloLink, Observable } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from 'apollo-utilities';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import { isBrowser } from "./isBrowser";
import { getAccessToken } from "./accessToken";
import refreshToken from './refreshToken';
import { getRefreshToken, saveTokens, deleteTokens } from './refreshTkn';
import { refreshAccessToken } from './refreshAccessToken';

interface NewHeaders {
    headers: {
        "authorization": string;
        "accessTokenCookie": string;
        "refreshTokenCookie": string;
    };
}

const isServer = () => typeof window === "undefined";

if (isServer()) {
    (global as any).fetch = fetch;
}

const cache = new InMemoryCache({addTypename: true});

const create = (initialState, serverAccessToken?: string) => {

    const retryLink = new RetryLink({
        delay: {
            initial: 1000
        },
        attempts: {
            max: 1000,
            retryIf: (error, _operation) => {
                return !!error && _operation.operationName !== 'specialCase';
            }
        }
    });
    
    const uploadLink = createUploadLink({
        uri: process.env.GRAPHQL_ENDPOINT!,
        credentials: "include",
        useGETForQueries: true,
        fetch: refreshToken,
        headers: {
            "keep-alive": "true"
        }
    });
    
    const wsLink = isBrowser ? new GraphQLWsLink(createClient({
        url: process.env.GRAPHQL_ENDPOINT_WS!,
        connectionParams: () => {
            const token = getAccessToken();

            if (token) {
                return { authToken: token };
            }

            return {};
        }
    })) : null;

    const authLink = setContext((_request, { headers }: { headers: Headers }): NewHeaders => {

        const accessToken = isServer() ? serverAccessToken : getAccessToken()
        const refreshToken = getRefreshToken()

        const newHeaders = {
            headers: {
                ...headers,
                authorization: accessToken ? `bearer ${accessToken}` : "",
                accessTokenCookie: accessToken ? accessToken : "",
                refreshTokenCookie: refreshToken ? refreshToken : ""
            }
        };

        return newHeaders
    });

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }): any => {
        // If network error, output message to console for debugging
        if (networkError) console.error(`[Network error]: ${networkError}`);
        // If graphQL error...
        if (graphQLErrors) {
            // If error is due to unathenticated user request and a refresh token is available...
            const { extensions } = graphQLErrors[0];

            const refreshToken = getRefreshToken() ? getRefreshToken() : "";

            if (
                extensions &&
                extensions.code === "UNAUTHENTICATED" &&
                refreshToken
            ) {
                // Create a new Observerable
                return new Observable((observer): void => {
                    // Refresh the access token
                    refreshAccessToken(refreshToken)
                        // On successful refresh...
                        .then((newTokens): void => {
                            // Delete cookies if no new access token provided
                            if (!newTokens) {
                                /* deleteTokens(); */
                                console.log("Token not exist")
                            }
                            // Update cookies and headers if new tokens returned
                            else {
                                //
                                operation.setContext(
                                    ({ headers }: { headers: Headers }): NewHeaders => {
                                        const newHeaders = {
                                            headers: {
                                                ...headers,
                                                authorization: newTokens.accessToken ? `bearer ${newTokens.accessToken}` : "",
                                                accessTokenCookie: newTokens.accessToken,
                                                refreshTokenCookie: newTokens.refreshToken
                                            }
                                        };
                                        return newHeaders;
                                    }
                                );
                                saveTokens(newTokens.accessToken, newTokens.refreshToken);
                            }
                            // Bind observable subscribers
                            const subscriber = {
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer)
                            };
                            // Retry last failed request
                            forward(operation).subscribe(subscriber);
                        })
                        // On refresh failure...
                        .catch((err: Error): void => {
                            // Delete tokens from cookies
                            deleteTokens();
                            // Honestly I have no idea what this does...
                            observer.error(err);
                        });
                });
            }
        }
    })

    const trackerLink = new ApolloLink((operation, forward) => {
        if (forward === undefined) return null
    
        const context = operation.getContext()
        const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries')!)! || []
    
        if (context.tracked) {
            const { operationName, query, variables } = operation
        
            const newTrackedQuery = {
                query,
                context,
                variables,
                operationName,
            }
        
            window.localStorage.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]))
        }
        
        return forward(operation).map((data) => {
            
            if (context.tracked) {
                window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueries))
            }
    
            return data
        })
    })

    const client = new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: isBrowser ? ApolloLink.from([trackerLink, authLink, errorLink, retryLink])
            .split(
                // split based on operation type
                ({ query }) => {
                    const { kind, operation }: any = getMainDefinition(query);
                    return kind === "OperationDefinition" && operation === "subscription" && process.browser;
                },
                wsLink!,
                uploadLink
            ) : authLink.concat(uploadLink),
        cache: cache.restore(initialState || {}),
    })
    
    return client
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */

/**
* Creates and configures the ApolloClient
* @param  {Object} [initialState={}]
* @param  {Object} config
*/

export default function initApollo(initialState, serverAccessToken?: string) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (isServer()) {
        let fetchOptions = {}

        // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
        // 'https-proxy-agent' is required here because it's a sever-side only module
        /* if (process.env.https_proxy) {
            fetchOptions = {
                // agent: new (require('https-proxy-agent'))(process.env.https_proxy),
            }
        } */
        return create(initialState, serverAccessToken)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}


// APOLLO CLIENT PERSIST
const persist = async () => {

    const persistor = await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });

    return persistor;

};

export {
    create,
    persist 
}