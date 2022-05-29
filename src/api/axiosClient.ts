import { API_URL, QUERY_AUTH } from '@/config';
import { queryClient } from '@/providers/AppProvider';
import { ResponseData } from '@/types';
import axios from 'axios';
import { toast } from 'react-toastify';

let calledApi = false;

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use(async config => {
    return config;
});

let requestedRefreshToken: Promise<ResponseData> | null = null;

axiosClient.interceptors.response.use(
    response => {
        calledApi = true;

        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    async error => {
        if (error.response.status === 401) {
            requestedRefreshToken = requestedRefreshToken
                ? requestedRefreshToken
                : axios.post(`${API_URL}/auth/refresh-token`, undefined, {
                      withCredentials: true,
                  });

            try {
                await requestedRefreshToken;

                requestedRefreshToken = null;

                return axiosClient(error.config);
            } catch (_) {
                calledApi && queryClient.setQueryData(QUERY_AUTH, null);
            }
        }

        let errorMessage: string;

        if (error.response) {
            errorMessage = error.response.data
                ? error.response.data.message
                : error.response.message;
        } else if (error.request) {
            errorMessage = 'The request was made but no response was received!';
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'Something went wrong!';
        }

        calledApi && toast.error(errorMessage || 'Something went wrong!');

        calledApi = true;

        throw error;
    }
);

export default axiosClient;
