import MainLayout from '@/components/layout';
import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));

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
        children: [{ index: true, element: <Dashboard /> }],
    },
];

export default privateRoutes;
