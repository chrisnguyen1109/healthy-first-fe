import { printFacilityCertificate } from '@/api/certificate';
import { ResponseData } from '@/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const usePrintCertificate = (
    options: Omit<
        UseMutationOptions<ResponseData<any>, unknown, string, unknown>,
        'mutationFn'
    > = {}
) =>
    useMutation((id: string) => printFacilityCertificate(id), {
        onSuccess: response => {
            if (response.message === 'Success' && response.data.url) {
                window.open(response.data.url);
            }
        },
        ...options,
    });
