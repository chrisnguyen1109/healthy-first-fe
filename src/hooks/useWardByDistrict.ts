import { getWardsByDistrict } from '@/api/provinceApi';
import { QUERY_WARD } from '@/config';
import { District } from '@/types';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

export const useWardByDistrict = (
    id: number,
    options: Omit<
        UseQueryOptions<District, unknown, District, QueryKey>,
        'queryKey' | 'queryFn'
    > = {}
) =>
    useQuery<District>([QUERY_WARD, id], () => getWardsByDistrict(id), {
        staleTime: Infinity,
        ...options,
    });
