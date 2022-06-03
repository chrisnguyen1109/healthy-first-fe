import { District, Province } from '@/types';
import axiosClient from './axiosClient';

const PROVINCE_BASE_URL = 'https://provinces.open-api.vn/api';

export const getProvinces = async (): Promise<Province[]> => {
    return axiosClient.get('/p', {
        baseURL: PROVINCE_BASE_URL,
    });
};

export const getDistrictsByProvince = async (id: number): Promise<Province> => {
    return axiosClient.get(`/p/${id}?depth=2`, {
        baseURL: PROVINCE_BASE_URL,
    });
};

export const getWardsByDistrict = async (id: number): Promise<District> => {
    return axiosClient.get(`/d/${id}?depth=2`, {
        baseURL: PROVINCE_BASE_URL,
    });
};
