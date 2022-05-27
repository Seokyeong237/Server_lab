import { SchoolInfo } from "../school/SchoolInfo";

// 이런 것들을 받아오겠다~
export interface UserCreateDto {
    name: string;
    phone: string;
    email: string;
    age?: number;
    school?: SchoolInfo;
}