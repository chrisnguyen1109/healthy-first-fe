import { HasId, ResponseData, TimeStamp } from './common';

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EXPERT = 'expert',
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface User extends HasId, TimeStamp {
    fullName: string;
    email: string;
    avatar: string;
    role: UserRole;
    provinceCode?: number;
    districtCode?: number;
    status: boolean;
}

export type UserRecordResponse = ResponseData<User>;
