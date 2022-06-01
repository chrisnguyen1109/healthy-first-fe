import MainLayout from '@/components/layout';
import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));

const UserList = React.lazy(() => import('@/pages/user'));
const CreateUser = React.lazy(() => import('@/pages/user/CreateUser'));

const FacilityList = React.lazy(() => import('@/pages/facility'));
const CreateFacility = React.lazy(
    () => import('@/pages/facility/CreateFacility')
);
const EditFacility = React.lazy(() => import('@/pages/facility/EditFacility'));

const CertificateList = React.lazy(() => import('@/pages/certificate'));
const UpdateCertificate = React.lazy(
    () => import('@/pages/certificate/UpdateCertificate')
);

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
            { path: '/facility', element: <FacilityList /> },
            { path: '/facility/create', element: <CreateFacility /> },
            { path: '/facility/edit/:id', element: <EditFacility /> },
            { path: '/certificate', element: <CertificateList /> },
            { path: '/certificate/edit/:id', element: <UpdateCertificate /> },
        ],
    },
];

export default privateRoutes;
