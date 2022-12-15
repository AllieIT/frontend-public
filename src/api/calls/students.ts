import axios from "axios";
import { UserResponse } from "../types/responses";
import { retrieveJWTToken } from "../../util/cookies";

/**
 * Retrieve user data from student_id
 * @param id student_id
 */
export const getUserFromStudentId = async (id: number): Promise<UserResponse | string> => {
    return (await axios.get<UserResponse | string>(
        `http://localhost:3030/api/students/${id}`,
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}