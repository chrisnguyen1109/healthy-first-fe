import AppProvider from '@/providers/AppProvider';
import { Suspense } from 'react';
import AppRoutes from '@/routes';
import LazyLoad from '@/components/LazyLoad';

const App: React.FC = () => {
    return (
        <AppProvider>
            <Suspense fallback={<LazyLoad />}>
                <AppRoutes />
            </Suspense>
        </AppProvider>
    );
};

export default App;
