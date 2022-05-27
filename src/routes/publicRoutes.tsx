import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const Login = React.lazy(() => import('@/pages/auth/Login'));

const publicRoutes: RouteObject[] = [
    {
        path: '/auth',
        element: <Outlet />,
        children: [{ path: 'login', element: <Login /> }],
    },
];

export default publicRoutes;
