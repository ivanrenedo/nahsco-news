import React from 'react';
import Head from 'next/head';
import cookie from "cookie";
import { ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import initApollo from "./ApolloLink";
import { getAccessToken, setAccessToken } from './accessToken';
import redirect from './redirect';
import { WithApolloProps } from '../interfaces';


const isServer = () => typeof window === "undefined";

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 * 
 */
let globalApolloClient;

export default function withApollo(PageComponent: any, { ssr = true } = {}) {
    const WithApollo = ({
        apolloClient,
        apolloState,
        serverAccessToken,
        ctx,
        ...pageProps
    }: WithApolloProps) => {

        if (!isServer() && !getAccessToken()) {
            setAccessToken(serverAccessToken);
        }
        
        const client = apolloClient || initApolloClient(
            apolloState,
            serverAccessToken
        );
        
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        );
    };

    if (process.env.NODE_ENV !== "production") {
        // Find correct display name
        const displayName =
            PageComponent.displayName || PageComponent.name || "Component";

        // Warn if old way of installing apollo is used
        if (displayName === "App") {
            console.warn("This withApollo HOC only works with PageComponents.");
        }

        // Set correct display name for devtools
        WithApollo.displayName = `withApollo(${displayName})`;
        
    }
    
    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async (ctx: any) => {
            const {
                AppTree,
                Component,
                router,
                ctx: { req, res, query }
            } = ctx;
            
            let serverAccessToken = '';
            let authenticated = false;

            if (isServer()) {

                const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

                try{
                    if (cookies.rsht) {
                        const response = await fetch(process.env.GRAPHQL_ENDPOINT_RT!, {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                cookie: "rsht=" + cookies.rsht
                            }
                        });
    
                        serverAccessToken = await response.json()
                            .then(res => {
                                return res.accessToken
                            })
                            .catch(err => {
                                console.log(err)
                                throw new Error(err)
                            })
                            .finally(() => {
                                return {}
                            })
                        authenticated = !!cookies.rsht;
                    }
    
                }catch(err){
                    console.error(err)
                }
                
            }
                         
            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
                {}
            ));

            const pageProps = PageComponent.getInitialProps
                ? await PageComponent.getInitialProps(ctx)
                : {};

            // Only on the server
            if (typeof window === "undefined") {
                // When redirecting, the response is finished.
                // No point in continuing to render
                if (res && res.finished) {
                    return pageProps;
                }

                if (query.logout === "true") {
                    try {
                        apolloClient?.clearStore();
                        redirect(res, "/");
                    } catch (err) {
                        console.log("error while logging out", err);
                    }
                }

                if (query.logout === "admin") {
                    try {
                        apolloClient?.clearStore();
                        redirect(res, "/backoffice/signin");
                    } catch (err) {
                        console.log("error while logging out", err);
                    }
                }

                if (query.delete === "true") {
                    try {
                        apolloClient?.clearStore();
                        redirect(res, "/signup");
                    } catch (err) {
                        console.log("error while delete account", err);
                    }
                }

                if (ssr) {
                    
                    try {
                        // Run all GraphQL queries
                        await getDataFromTree(
                            <AppTree
                                Component={Component}
                                router={router}
                                apolloClient={apolloClient}
                                authenticated={authenticated}
                                {...pageProps}
                            />
                        );
                    } catch (error: any) {
                        // Prevent Apollo Client GraphQL errors from crashing SSR.
                        // Handle them in components via the data.error prop:
                        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                        console.error("Error while running `getDataFromTree`", error);
                        if (error.message.includes('Not authorized')) {
                            redirect(res, '/')
                        }

                    }
                }

                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                Head;
            }

            // Extract query data from the Apollo store
            const apolloState = apolloClient?.cache.extract();
            
            return {
                apolloState,
                serverAccessToken,
                authenticated,
                ...pageProps
            };
        };
    }

    return WithApollo;
}

export function initApolloClient(initialState: any, serverAccessToken?: string) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === "undefined") {
        return initApollo(initialState, serverAccessToken);
    }

    // Reuse client on the client-side
    if (!globalApolloClient) {
        globalApolloClient = initApollo(initialState, serverAccessToken);
    }

    return globalApolloClient;
}

