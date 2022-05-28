import { getProvinces } from '@/api/provinceApi';
import { QUERY_PROVINCE } from '@/config';
import { Province } from '@/types';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

export const useProvince = (
    options: Omit<
        UseQueryOptions<Province[], unknown, Province[], QueryKey>,
        'queryKey' | 'queryFn'
    > = {}
) =>
    useQuery<Province[]>(QUERY_PROVINCE, getProvinces, {
        staleTime: Infinity,
        ...options,
    });
