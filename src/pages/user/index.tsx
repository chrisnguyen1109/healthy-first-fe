import { DEFAULT_FILTER } from '@/config';
import {
    useAuthentication,
    useDeleteUser,
    useUpdateUser,
    useUsers,
} from '@/hooks';
import {
    SortChangeProps,
    SortType,
    UserFilter,
    UserQuery,
    UserRole,
} from '@/types';
import { convertSortFilter } from '@/utils';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserSearch from './components/UserSearch';
import UserTable from './components/UserTable';

const UserList: React.FC = () => {
    const { data: currentAuth } = useAuthentication();
    const currentRole = currentAuth?.data?.record.role;

    const [filter, setFilter] = useState<UserQuery>(DEFAULT_FILTER);

    const [sortQuery, setSortQuery] = useState<Record<
        string,
        SortType | null
    > | null>(null);

    const usersFilter = sortQuery
        ? {
              ...filter,
              _sort: convertSortFilter(sortQuery) as any,
          }
        : filter;

    const { data, isLoading } = useUsers(usersFilter, {
        keepPreviousData: true,
    });

    const { mutate: mutateInactiveUser, isLoading: deletingUser } =
        useDeleteUser({
            onSuccess: () => {
                toast.success('Disable user successfully!');
            },
        });
    const { mutate: muatteActiveUser, isLoading: updatingUser } = useUpdateUser(
        {
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    toast.success('Active user successfully!');
                }
            },
        }
    );

    if (currentRole === UserRole.EXPERT) {
        return <Navigate to="/" replace />;
    }

    const pageChangeHandler = (selected: number) => {
        setFilter(prev => ({
            ...prev,
            _page: selected + 1,
        }));
    };

    const pageLimitChangeHandler = (selected: number) => {
        setFilter(prev => ({
            ...prev,
            _page: 1,
            _limit: selected,
        }));
    };

    const sortUserTableHandler = ({ field, sortType }: SortChangeProps) => {
        setSortQuery(prev => ({
            ...prev,
            [field]: sortType,
        }));
    };

    const searchUsersHandler = (data: Partial<UserFilter>) => {
        setFilter(prev => ({
            ...prev,
            _page: 1,
            ...data,
        }));
    };

    const resetSearchUsersHandler = () => {
        setFilter(() => DEFAULT_FILTER);
        setSortQuery(null);
    };

    const tableLoading = isLoading || updatingUser || deletingUser;

    return (
        <div>
            <UserSearch
                formLoading={tableLoading}
                onSearchChange={searchUsersHandler}
                onResetTable={resetSearchUsersHandler}
            />
            <UserTable
                tableLoading={tableLoading}
                userListResponse={data!}
                onInactiveUser={mutateInactiveUser}
                onActiveUser={muatteActiveUser}
                onPageChange={pageChangeHandler}
                onPageLimitChange={pageLimitChangeHandler}
                onSortChange={sortUserTableHandler}
                sortQuery={sortQuery ?? {}}
            />
        </div>
    );
};

export default UserList;
