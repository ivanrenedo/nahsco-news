import { isBrowser } from './isBrowser';


export function storeValue(key, value) {
    isBrowser && window.localStorage.setItem(key, value);
}

export function getStoredValue(key: string) {
    return isBrowser && window.localStorage.getItem(key);
}
