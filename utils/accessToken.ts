let accessToken: string = '';

export const setAccessToken = (value: string) => {
    accessToken = value
    return accessToken;
};

export const getAccessToken = () => {
    return accessToken;
};
