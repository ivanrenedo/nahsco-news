import jwtDecode from "jwt-decode";
import fetch from 'isomorphic-unfetch';

import { getAccessToken, setAccessToken } from './accessToken';
import { isBrowser } from "./isBrowser";

const isTokenValid = (): boolean => {
    const token = getAccessToken();

    if (!isBrowser && token === undefined) {

        return false;
    }  

    try {
        const { exp }:any = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            //token expired
            console.log('TOKEN EXPIRADO');
            return false;
        } else {
            return true;
        }
    } catch(err) {
        return false;
    }
};


export default async (uri: string, options: any) => {
    const initialRequest = await fetch(uri, options);
    

        if (!isTokenValid()) {
            try {

                const accessToken = getAccessToken();

                //here you can use a REST API request or a work around to use your mutation as shown below
                await fetch(process.env.GRAPHQL_ENDPOINT_RT!, {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${accessToken}`,
                    },
                    credentials: "include",
                    method: 'POST',
                }).then((res) => {
                    res
                        .text()
                        .then(JSON.parse)
                        .then((res: any) => {
                            const { accessToken } = res;
                            
                            setAccessToken(accessToken)
                        })
                })
            } catch (error) {
                console.log(error)
            }
        }

   

    return initialRequest;
};



