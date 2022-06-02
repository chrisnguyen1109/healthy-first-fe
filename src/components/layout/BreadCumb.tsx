import { Link, useLocation } from 'react-router-dom';

const BreadCumb: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const renderBreadcumb = () => {
        switch (true) {
            case pathname === '/': {
                return 'Dashboard';
            }
            case pathname.startsWith('/user'): {
                return 'User Management';
            }
            case pathname.startsWith('/facility'): {
                return 'Facility Management';
            }
            case pathname.startsWith('/certificate'): {
                return 'Certificate Management';
            }
            case pathname === '/profile': {
                return 'Profile';
            }
            default: {
                return '';
            }
        }
    };

    return (
        <div className="page-breadcrumb">
            <div className="row align-items-center">
                <div className="col-6">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 d-flex align-items-center">
                            <li className="breadcrumb-item">
                                <Link to="/" className="link">
                                    <i className="mdi mdi-home-outline fs-4"></i>
                                </Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                {renderBreadcumb()}
                            </li>
                        </ol>
                    </nav>
                    <h1 className="mb-0 fw-bold">{renderBreadcumb()}</h1>
                </div>
            </div>
        </div>
    );
};

export default BreadCumb;
