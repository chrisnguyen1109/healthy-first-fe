import { LoginForm, UserRecordResponse } from '@/types';
import axiosClient from './axiosClient';

const AUTH_RESOURCE = '/auth';

export const signinApi = (data: LoginForm): Promise<UserRecordResponse> =>
    axiosClient.post(`${AUTH_RESOURCE}/login`, data);

export const getMeApi = (): Promise<UserRecordResponse> =>
    axiosClient.get(`${AUTH_RESOURCE}/me`);

export const logoutApi = () => axiosClient.post(`${AUTH_RESOURCE}/logout`);
