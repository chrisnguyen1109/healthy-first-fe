import CustomTable from '@/components/CustomTable';
import { DEFAULT_PAGINATION } from '@/config';
import { useDialog } from '@/hooks';
import {
    ColumnsType,
    ResponseData,
    SortChangeProps,
    SortType,
    UpdateProps,
    User,
    UserListResponse,
    UserRecordResponse,
    UserRole,
} from '@/types';
import { renderUserRole, renderUserStatus } from '@/utils';
import { Button, Image } from 'react-bootstrap';
import { UseMutateFunction } from 'react-query';
import { Link } from 'react-router-dom';

interface UserTableProps {
    userListResponse: UserListResponse;
    tableLoading: boolean;
    onInactiveUser: UseMutateFunction<
        ResponseData<null>,
        unknown,
        string,
        unknown
    >;
    onActiveUser: UseMutateFunction<
        UserRecordResponse,
        unknown,
        UpdateProps<User>,
        unknown
    >;
    onPageChange: (selected: number) => void;
    onPageLimitChange: (selected: number) => void;
    onSortChange: (sortObject: SortChangeProps) => void;
    sortQuery: Record<string, SortType | null>;
}

const UserTable: React.FC<UserTableProps> = ({
    userListResponse,
    tableLoading,
    onActiveUser,
    onInactiveUser,
    onPageChange,
    onPageLimitChange,
    onSortChange,
    sortQuery,
}) => {
    const { setConfirm } = useDialog();

    const columns: ColumnsType<User>[] = [
        {
            key: 'avatar',
            title: 'Avatar',
            render: (value: string) => (
                <Image src={value} alt="avatar" roundedCircle width="40" />
            ),
        },
        {
            key: 'fullName',
            title: 'Full name',
            render: (value: string) => <h5 className="m-b-0">{value}</h5>,
            showSort: true,
            sortType: sortQuery['fullName'],
        },
        {
            key: 'email',
            title: 'Email',
            showSort: true,
            sortType: sortQuery['email'],
        },
        {
            key: 'role',
            title: 'Role',
            render: (value: UserRole) => renderUserRole(value),
            showSort: true,
            sortType: sortQuery['role'],
        },
        {
            key: 'status',
            title: 'Status',
            render: (value: boolean) => renderUserStatus(value),
            showSort: true,
            sortType: sortQuery['status'],
        },
        {
            key: 'provinceName',
            title: 'Province name',
            showSort: true,
            sortType: sortQuery['provinceName'],
        },
        {
            key: 'districtName',
            title: 'District name',
            showSort: true,
            sortType: sortQuery['districtName'],
        },
    ];

    const activeUser = (id: string) => {
        setConfirm('Are you sure you want to active this user?', () => {
            onActiveUser({ id, body: { status: true } });
        });
    };

    const inactiveUser = (id: string) => {
        setConfirm('Are you sure you want to disable this user?', () => {
            onInactiveUser(id);
        });
    };

    const controls = (
        <Link to="/user/create">
            <Button className="text-white">New User</Button>
        </Link>
    );

    const actions = (data: User) => (
        <div className="d-flex gap-3 justify-content-center">
            <Button
                variant="outline-info"
                size="sm"
                title="Active user"
                onClick={() => activeUser(data._id)}
            >
                <i className="mdi mdi-account-check"></i>
            </Button>
            <Button
                variant="outline-danger"
                size="sm"
                title="Inactive user"
                onClick={() => inactiveUser(data._id)}
            >
                <i className="mdi mdi-account-off"></i>
            </Button>
        </div>
    );

    return (
        <CustomTable
            columns={columns}
            dataSource={userListResponse?.data?.records || []}
            pagination={
                userListResponse?.data?.pagination || DEFAULT_PAGINATION
            }
            title="User Table"
            subtitle="Overview of User Table"
            control={controls}
            actions={actions}
            isLoading={tableLoading}
            onPageChange={onPageChange}
            onPageLimitChange={onPageLimitChange}
            onSortChange={onSortChange}
        />
    );
};

export default UserTable;
