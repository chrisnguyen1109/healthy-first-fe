import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';

interface TopbarHeaderProps {
    onShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopbarHeader: React.FC<TopbarHeaderProps> = ({ onShowSidebar }) => {
    return (
        <header className="topbar" data-navbarbg="skin6">
            <nav className="navbar top-navbar navbar-expand-md navbar-light">
                <div className="navbar-header" data-logobg="skin6">
                    <Link to="/" className="navbar-brand">
                        <b className="logo-icon">
                            <Image
                                src="/assets/images/logo.png"
                                alt="logo"
                                className="fit-image"
                            />
                        </b>

                        <span className="logo-text">
                            <Image
                                src="/assets/images/logo-text.png"
                                alt="logo text"
                                className="fit-image"
                            />
                        </span>
                    </Link>

                    <Button
                        variant="outline-secondary"
                        className="d-block d-md-none m-r-15"
                        onClick={() => onShowSidebar(prev => !prev)}
                    >
                        <i className="mdi mdi-menu"></i>
                    </Button>
                </div>

                <div
                    className="navbar-collapse collapse"
                    id="navbarSupportedContent"
                    data-navbarbg="skin5"
                >
                    <ul className="navbar-nav float-start me-auto">
                        <li className="nav-item search-box">
                            <div className="nav-link cursor-pointer">
                                <i className="mdi mdi-magnify me-1"></i>
                                <span className="font-16">Search</span>
                            </div>
                        </li>
                    </ul>

                    <UserDropdown />
                </div>
            </nav>
        </header>
    );
};

export default TopbarHeader;
