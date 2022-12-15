import axios, { AxiosResponse } from "axios";
import { UserResponse } from "../types/responses";
import { SignInRequestBody, SignUpRequestBody } from "../types/requests";
import { retrieveJWTToken } from "../../util/cookies";

/**
 * Send a sign in request
 * @param requestBody object containing request parameters
 */
export const signIn = async (requestBody: SignInRequestBody): Promise<AxiosResponse<UserResponse | string>> => {
    return axios.post<UserResponse | string>(
        'http://localhost:3030/api/users/login',
        requestBody,
        { withCredentials: true },
    );
}

/**
 * Send a sign up request
 * @param requestBody object containing request parameters
 */
export const signUp = async (requestBody: SignUpRequestBody): Promise<AxiosResponse<UserResponse | string>> => {
    return axios.post<UserResponse | string>(
        'http://localhost:3030/api/users/signup',
        requestBody,
        { withCredentials: true },
    );
}

/**
 * Retrieve user data from user_id
 * @param id user_id
 */
export const getUserFromId = async (id: number): Promise<UserResponse | string> => {
    return (await axios.get<UserResponse | string>(
        `http://localhost:3030/api/users/${id}`,
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}

/**
 * Send a request to destroy session stored at the backend
 */
export const logOut = async (): Promise<AxiosResponse<string>> => {
    return axios.delete<string>(
        `http://localhost:3030/api/users/logout`,
        { withCredentials: true, headers: { 'x-jwt-token': retrieveJWTToken() } }
    )
}