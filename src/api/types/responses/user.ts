export interface UserResponse {
    user_id: number;
    name: string;
    surname: string;
    faculty: string;
    group_type: string;
    is_teacher: boolean;
    email: string;
    secondary_id?: number;
}