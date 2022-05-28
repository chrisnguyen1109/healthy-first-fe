import { getDistrictsByProvince } from '@/api/provinceApi';
import { QUERY_PROVINCE } from '@/config';
import { Province } from '@/types';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

export const useDistrictByProvince = (
    id: number,
    options: Omit<
        UseQueryOptions<Province, unknown, Province, QueryKey>,
        'queryKey' | 'queryFn'
    > = {}
) =>
    useQuery<Province>([QUERY_PROVINCE, id], () => getDistrictsByProvince(id), {
        staleTime: Infinity,
        ...options,
    });
