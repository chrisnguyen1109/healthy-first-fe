import MainLayout from '@/components/layout';
import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const UserList = React.lazy(() => import('@/pages/user'));
const CreateUser = React.lazy(() => import('@/pages/user/CreateUser'));

const App = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: '/user', element: <UserList /> },
            { path: '/user/create', element: <CreateUser /> },
        ],
    },
];

export default privateRoutes;
