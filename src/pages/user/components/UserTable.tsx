import CustomTable from '@/components/CustomTable';
import { useDeleteUser, useDialog, useUpdateUser } from '@/hooks';
import { ColumnsType, User, UserListResponse, UserRole } from '@/types';
import { renderUserRole, renderUserStatus } from '@/utils';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface UserTableProps {
    userListResponse: UserListResponse;
    tableLoading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
    userListResponse,
    tableLoading,
}) => {
    const { setConfirm } = useDialog();
    const { mutate: mutateInactiveUser, isLoading: deletingUser } =
        useDeleteUser();
    const { mutate: muatteActiveUser, isLoading: updatingUser } =
        useUpdateUser();

    const columns: ColumnsType<User> = [
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
        },
        {
            key: 'email',
            title: 'Email',
        },
        {
            key: 'role',
            title: 'Role',
            render: (value: UserRole) => renderUserRole(value),
        },
        {
            key: 'status',
            title: 'Status',
            render: (value: boolean) => renderUserStatus(value),
        },
        {
            key: 'provinceName',
            title: 'Province name',
        },
        {
            key: 'districtName',
            title: 'District name',
        },
    ];

    const activeUser = (id: string) => {
        setConfirm('Are you sure you want to active this user?', () => {
            muatteActiveUser({ id, body: { status: true } });
        });
    };

    const inactiveUser = (id: string) => {
        setConfirm('Are you sure you want to disable this user?', () => {
            mutateInactiveUser(id);
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
            title="User Table"
            subtitle="Overview of User Tabe"
            control={controls}
            actions={actions}
            isLoading={tableLoading || updatingUser || deletingUser}
        />
    );
};

export default UserTable;
