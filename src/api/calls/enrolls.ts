import axios from "axios";
import { EnrollStudentRequestBody } from "../types/requests";
import { retrieveJWTToken } from "../../util/cookies";

/**
 * Get ids of classes for which given student is enrolled
 * @param student_id student_id
 */
export const getClassIdsForStudent = async (student_id: number): Promise<number[]> => {
    return (await axios.get<number[]>(
        `http://localhost:3030/api/enroll/student/${student_id}`,
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}

/**
 * Enrolls student into given class
 * @param class_id class_id
 * @param student_id student_id
 */
export const enrollIntoClass = async (class_id: number, student_id: number): Promise<string> => {
    const req: EnrollStudentRequestBody = { student_id: student_id }
    console.log(req);
    return (await axios.post<string>(
        `http://localhost:3030/api/enroll/class/${class_id}`,
        req,
        { headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}

/**
 * Cancels enrollment, removing it from the server
 * @param class_id class_id
 * @param student_id student_id
 */
export const cancelEnroll = async (class_id: number, student_id: number): Promise<string> => {
    const req: EnrollStudentRequestBody = { student_id: student_id }
    return (await axios.delete<string>(
        `http://localhost:3030/api/enroll/class/${class_id}`,
        { data: req, headers: { 'x-jwt-token': retrieveJWTToken() } }
    )).data;
}