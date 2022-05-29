import {
    createItem,
    deleteItem,
    fetchItem,
    fetchList,
    updateItem,
} from '@/api/fetchApi';
import { HasId, ResponseData, UpdateProps } from '@/types';
import {
    QueryKey,
    useMutation,
    UseMutationOptions,
    useQuery,
    useQueryClient,
    UseQueryOptions,
} from 'react-query';

export interface Feature {
    queryKey: string;
    service: string;
}

const initialCustomQuery = <
    X extends HasId,
    Y extends ResponseData<X>,
    Z extends ResponseData<X[]>,
    T extends object,
    W extends Partial<X>
>(
    feature: Feature
) => {
    const useItem = (
        id: string,
        options: Omit<
            UseQueryOptions<Y, unknown, Y, QueryKey>,
            'queryKey' | 'queryFn'
        > = {}
    ) =>
        useQuery<Y>(
            [feature.queryKey, id],
            () =>
                fetchItem<Y>({
                    id,
                    service: feature.service,
                }),
            {
                enabled: !!id,
                ...options,
            }
        );

    const useList = (
        payload: T,
        options: Omit<
            UseQueryOptions<Z, unknown, Z, QueryKey>,
            'queryKey' | 'queryFn'
        > = {}
    ) =>
        useQuery<Z>(
            [feature.queryKey, payload],
            () =>
                fetchList<T, Z>({
                    payload,
                    service: feature.service,
                }),
            options
        );

    const useCreateItem = (
        options: Omit<
            UseMutationOptions<Y, unknown, W, unknown>,
            'mutationFn'
        > = {}
    ) => {
        const clientQuery = useQueryClient();

        return useMutation(
            (body: W) =>
                createItem<W, Y>({
                    body,
                    service: feature.service,
                }),
            {
                onSettled: () =>
                    clientQuery.invalidateQueries(feature.queryKey),
                ...options,
            }
        );
    };

    const useUpdateItem = (
        options: Omit<
            UseMutationOptions<Y, unknown, UpdateProps<X>, unknown>,
            'mutationFn'
        > = {}
    ) => {
        const clientQuery = useQueryClient();

        return useMutation(
            ({ id, body }: UpdateProps<X>) =>
                updateItem<Partial<X>, Y>({
                    id,
                    body,
                    service: feature.service,
                }),
            {
                onSettled: () =>
                    clientQuery.invalidateQueries(feature.queryKey),
                ...options,
            }
        );
    };

    const useDeleteItem = (
        options: Omit<
            UseMutationOptions<ResponseData<null>, unknown, string, unknown>,
            'mutationFn'
        > = {}
    ) => {
        const clientQuery = useQueryClient();

        return useMutation(
            (id: string) =>
                deleteItem<ResponseData<null>>({
                    id,
                    service: feature.service,
                }),
            {
                onSettled: () =>
                    clientQuery.invalidateQueries(feature.queryKey),
                ...options,
            }
        );
    };

    return {
        useCreateItem,
        useItem,
        useList,
        useUpdateItem,
        useDeleteItem,
    };
};

export default initialCustomQuery;
