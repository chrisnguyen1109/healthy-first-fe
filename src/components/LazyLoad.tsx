import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

const LazyLoad: React.FC = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    });

    return <></>;
};

export default LazyLoad;
