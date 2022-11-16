export const isBrowser: boolean = (process as any).browser;

export const isTheBrowser = (): boolean => {
    return typeof window !== 'undefined';
}