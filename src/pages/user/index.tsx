import { useUsers } from '@/hooks';
import { UserQuery } from '@/types';
import { useState } from 'react';
import UserTable from './components/UserTable';

const UserList: React.FC = () => {
    const [filter, setFilter] = useState<UserQuery>({});

    const { data, isLoading } = useUsers(filter);

    return (
        <div>
            <UserTable tableLoading={isLoading} userListResponse={data!} />
        </div>
    );
};

export default UserList;
