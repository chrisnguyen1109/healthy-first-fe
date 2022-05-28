import { logoutApi } from '@/api/authApi';
import { QUERY_AUTH } from '@/config';
import { useEffect, useState } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

const UserDropdown: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(logoutApi, {
        onSuccess: () => {
            queryClient.setQueryData(QUERY_AUTH, null);
        },
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
                        <Image
                            src="https://res.cloudinary.com/chriscloud1109/image/upload/v1651629584/media/default_gr1p4q.jpg"
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
                        onClick={() => mutate()}
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
