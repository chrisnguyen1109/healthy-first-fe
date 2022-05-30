import { logoutApi } from '@/api/authApi';
import { useAuthentication } from '@/hooks';
import { useEffect, useState } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

const UserDropdown: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const { data: currentAuth } = useAuthentication();

    const { mutate: logOutAccount, isLoading } = useMutation(logoutApi, {
        onSuccess: () => window.location.reload(),
    });

    useEffect(() => {
        const onBodyClick = () => {
            setShowDropdown(false);
        };

        document.body.addEventListener('click', onBodyClick);

        return () => document.body.removeEventListener('click', onBodyClick);
    }, []);

    const toggleDropdownClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();

        setShowDropdown(!showDropdown);
    };

    return (
        <ul className="navbar-nav float-end">
            <li className="nav-item dropdown">
                {!isLoading && (
                    <div
                        className="nav-link cursor-pointer"
                        onClick={toggleDropdownClick}
                    >
                        <div className="text-muted fs-5 m-r-10 fw-bold">
                            {currentAuth?.data?.record.fullName}
                        </div>
                        <Image
                            src={currentAuth?.data?.record.avatar}
                            alt="avatar"
                            roundedCircle
                            width="31"
                        />
                    </div>
                )}
                {isLoading && (
                    <div className="nav-link">
                        <Spinner animation="border" />
                    </div>
                )}
                <ul
                    className={`dropdown-menu dropdown-menu-end user-dd animated ${
                        showDropdown && 'show'
                    }`}
                >
                    <Link to="/profile" className="dropdown-item">
                        <i className="ti-user m-r-10 m-l-5"></i>
                        My profile
                    </Link>
                    <li
                        className="dropdown-item cursor-pointer"
                        onClick={() => logOutAccount()}
                    >
                        <i className="ti-shift-left m-r-10 m-l-5"></i>
                        Logout
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default UserDropdown;
