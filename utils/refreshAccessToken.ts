import { RefreshAccessTokenDocument } from "@generated/graphql";
import initApollo from "./ApolloLink";

interface RefreshAccessToken {
    (refreshToken: string): Promise<TokenValues | null>;
}

interface TokenValues {
    accessToken: string;
    refreshToken: string;
}

const refreshAccessToken: RefreshAccessToken = (
    refreshToken
) => {
    const client = initApollo({})
    return (
        client
            .mutate({
                mutation: RefreshAccessTokenDocument,
                variables: {
                    refreshToken
                }
            })
            .then(
                ({ data }): TokenValues => {
                    return data.refreshAccessToken;
                }
            )
            .catch(err => {
                console.log(err)
                return null
            })
    );
};

export {refreshAccessToken}