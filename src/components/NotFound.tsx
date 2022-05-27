import { useAuthentication } from '@/hooks';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const { data: currentAuth } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentAuth) {
            navigate('/auth/login', { replace: true });
        }
    }, [currentAuth]);

    return (
        <div className="error-box">
            <div className="error-body text-center">
                <h1 className="error-title text-danger">404</h1>
                <h3 className="text-uppercase error-subtitle">
                    PAGE NOT FOUND !
                </h3>
                <p className="text-muted m-t-30 m-b-30 text-uppercase">
                    You seem to be trying to find the way home
                </p>
                <Link
                    to="/"
                    className="btn btn-danger btn-rounded waves-effect waves-light m-b-40 text-white"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
