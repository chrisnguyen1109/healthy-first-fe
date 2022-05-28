import { QUERY_USER } from '@/config';
import {
    User,
    UserCreate,
    UserListResponse,
    UserQuery,
    UserRecordResponse,
} from '@/types';
import initialCustomQuery, { Feature } from './useCustomQuery';

class UserQueryClass implements Feature {
    constructor(
        public readonly queryKey: string,
        public readonly service: string
    ) {}
}

const userInstance = new UserQueryClass(QUERY_USER, 'user');

export const {
    useItem: useUser,
    useList: useUsers,
    useCreateItem: useCreateUser,
    useUpdateItem: useUpdateUser,
    useDeleteItem: useDeleteUser,
} = initialCustomQuery<
    User,
    UserRecordResponse,
    UserListResponse,
    UserQuery,
    UserCreate
>(userInstance);
