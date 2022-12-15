import axios, { AxiosResponse } from "axios";
import { ClassResponse } from "../types/responses";
import { retrieveJWTToken } from "../../util/cookies";

/**
 * Gets data about all classes stored in the backend
 */
export const getAllClasses = async (): Promise<ClassResponse[]> => {
    const ids = (await axios.get<number[]>(
        'http://localhost:3030/api/classes/',
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;

    const promises: Promise<AxiosResponse<ClassResponse>>[] = []
    for (const id of ids) {
        const opinionPromise = axios.get<ClassResponse>(
            `http://localhost:3030/api/classes/${id}`,
            { headers: { 'x-jwt-token': retrieveJWTToken() } }
        );
        promises.push(opinionPromise);
    }
    const results = await Promise.all(promises)
    return results.map(res => res.data);
}