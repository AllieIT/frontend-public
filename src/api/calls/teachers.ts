import axios, { AxiosResponse } from "axios";
import { UserResponse } from "../types/responses";
import { retrieveJWTToken } from "../../util/cookies";

/**
 * Get user data from teacher_id
 * @param id teacher_id
 */
export const getUserFromTeacherId = async (id: number): Promise<UserResponse | string> => {
    return (await axios.get<UserResponse | string>(
        `http://localhost:3030/api/teachers/${id}`,
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}

/**
 * Get records [number, string] containing user_id and their full name
 */
export const getAllTeacherNames = async (): Promise<[number, string][]> => {
    const ids = (await axios.get<number[]>(
        'http://localhost:3030/api/teachers/',
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;

    const promises: Promise<AxiosResponse<UserResponse>>[] = []
    for (const id of ids) {
        const userPromise = axios.get<UserResponse>(
            `http://localhost:3030/api/teachers/${id}`,
            { headers: { 'x-jwt-token': retrieveJWTToken() } }
        );
        promises.push(userPromise);
    }
    const results = await Promise.all(promises)
    return results.map(res => ([res.data.secondary_id!, res.data.name + ' ' + res.data.surname]));
}