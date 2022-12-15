import axios from "axios";
import { OpinionResponse } from "../types/responses";
import { CreateOpinionRequestBody } from "../types/requests";
import { retrieveJWTToken } from "../../util/cookies";

/**
 * Get all opinion IDs
 */
export const getAllOpinionIds = async (): Promise<number[]> => {
    return (await axios.get<number[]>(
        'http://localhost:3030/api/opinions/',
        {headers: {'x-jwt-token': retrieveJWTToken()}}
    )).data;
}

/**
 * Get data for opinion with given ID
 * @param opinion_id opinion_id
 */
export const getOpinionData = async (opinion_id: number): Promise<OpinionResponse> => {
    return (await axios.get<OpinionResponse>(
        `http://localhost:3030/api/opinions/${opinion_id}`,
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}

/**
 * Create a new opinion
 * @param teacher_id teacher_id
 * @param student_id student_id
 * @param opinion opinion text
 */
export const postNewOpinion = async (teacher_id: number, student_id: number, opinion: string): Promise<string> => {
    const req: CreateOpinionRequestBody = {
        student_id: student_id,
        opinion: opinion
    }

    return (await axios.post<string>(
        `http://localhost:3030/api/opinions/teachers/${teacher_id}`,
        req,
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}