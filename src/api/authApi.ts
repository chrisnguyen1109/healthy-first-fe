import { LoginForm, UpdateProfileForm, UserRecordResponse } from '@/types';
import axiosClient from './axiosClient';

const AUTH_BASE_URL = '/auth';

export const signinApi = (data: LoginForm): Promise<UserRecordResponse> =>
    axiosClient.post(`${AUTH_BASE_URL}/login`, data);

export const getMeApi = (): Promise<UserRecordResponse> =>
    axiosClient.get(`${AUTH_BASE_URL}/me`);

export const logoutApi = () => axiosClient.post(`${AUTH_BASE_URL}/logout`);

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
    });
};

export const updateProfile = (
    data: UpdateProfileForm
): Promise<UserRecordResponse> =>
    axiosClient.patch(`${AUTH_BASE_URL}/me`, data);
