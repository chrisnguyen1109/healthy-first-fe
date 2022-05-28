import { LoginForm, UserRecordResponse } from '@/types';
import axiosClient from './axiosClient';

const AUTH_RESOURCE = '/auth';

export const signinApi = (data: LoginForm): Promise<UserRecordResponse> =>
    axiosClient.post(`${AUTH_RESOURCE}/login`, data);

export const getMeApi = (): Promise<UserRecordResponse> =>
    axiosClient.get(`${AUTH_RESOURCE}/me`);

export const logoutApi = () => axiosClient.post(`${AUTH_RESOURCE}/logout`);

export const uploadAvatar = (image: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUD_UPDATE_PRESET!
    );
    formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME!);

    return axiosClient.post(process.env.REACT_APP_CLOUD_API!, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false,
    });
};
