import { getMeApi } from '@/api/authApi';
import { QUERY_AUTH } from '@/config';
import { UserRecordResponse } from '@/types';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

export const useAuthentication = (
    options:
        | Omit<
              UseQueryOptions<
                  UserRecordResponse,
                  unknown,
                  UserRecordResponse,
                  QueryKey
              >,
              'queryKey' | 'queryFn'
          >
        | undefined = {}
) =>
    useQuery<UserRecordResponse>(QUERY_AUTH, getMeApi, {
        staleTime: Infinity,
        ...options,
    });
