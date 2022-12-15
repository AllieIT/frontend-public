import Cookies from 'universal-cookie';
import { Buffer } from "buffer";

export interface CookieData extends Record<string, number>  {}

/**
 * Retrieve data stored in cookie, such as user_id
 */
export const retrieveJWTData = (): CookieData => {
    const cookies = new Cookies();
    const JWT = cookies.get('jwt');
    let data = {}
    try {
        data = JSON.parse(Buffer.from(JWT.split('.')[1], 'base64').toString('utf-8'));
    } catch {}

    return data;
}

/**
 * Retrieves JWT token stored in cookie
 */
export const retrieveJWTToken = (): string => {
    const cookies = new Cookies();
    return cookies.get('jwt');
}

/**
 * Destroys cookie containing JWT token
 */
export const destroyJWTToken = () => {
    const cookies = new Cookies();
    return cookies.remove('jwt');
}