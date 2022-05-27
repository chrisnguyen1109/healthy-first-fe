import { Link } from 'react-router-dom';

const BreadCumb: React.FC = () => {
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
                                Dashboard
                            </li>
                        </ol>
                    </nav>
                    <h1 className="mb-0 fw-bold">Dashboard</h1>
                </div>
            </div>
        </div>
    );
};

export default BreadCumb;
