import Cookies from 'js-cookie';
import { setAccessToken } from "./accessToken";

let refreshToken: string = '';

export const deleteTokens = () => {
    Cookies.remove('rsht');
}

export const saveTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    Cookies.set('rsht', refreshToken);
};

export const getRefreshToken = () => {
    refreshToken = Cookies.get('rsht')!
    return refreshToken;
};