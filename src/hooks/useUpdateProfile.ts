import { updateProfile } from '@/api/authApi';
import { QUERY_AUTH } from '@/config';
import { UpdateProfileForm, UserRecordResponse } from '@/types';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

export const useUpdateProfile = (
    options: Omit<
        UseMutationOptions<
            UserRecordResponse,
            unknown,
            UpdateProfileForm,
            unknown
        >,
        'mutationFn'
    > = {}
) => {
    const clientQuery = useQueryClient();

    return useMutation((data: UpdateProfileForm) => updateProfile(data), {
        onSettled: () => clientQuery.invalidateQueries(QUERY_AUTH),
        ...options,
    });
};
