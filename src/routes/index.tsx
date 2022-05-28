import NotFound from '@/components/NotFound';
import PreLoad from '@/components/PreLoad';
import { useAuthentication } from '@/hooks';
import { useState } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import commonRoutes from './commonRoutes';
import privateRoutes from './privateRoutes';
import publicRoutes from './publicRoutes';

const AppRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

    const { data: currentAuth } = useAuthentication({
        onError: () => navigate('/auth/login', { replace: true }),
        onSuccess: () => {
            if (location.pathname === '/auth/login') {
                navigate('/', { replace: true });
            }
        },
        onSettled: () => setIsAuthReady(true),
    });

    const routes = currentAuth ? privateRoutes : publicRoutes;

    const element = useRoutes([
        ...routes,
        ...commonRoutes,
        { path: '*', element: <NotFound /> },
    ]);

    return <>{isAuthReady ? element : <PreLoad />}</>;
};

export default AppRoutes;
