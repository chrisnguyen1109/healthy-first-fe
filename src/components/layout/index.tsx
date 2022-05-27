import { ReactNode } from 'react';
import BreadCumb from './BreadCumb';
import Sidebar from './Sidebar';
import TopbarHeader from './TopbarHeader';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin5"
            data-sidebartype="full"
            data-sidebar-position="absolute"
            data-header-position="absolute"
            data-boxed-layout="full"
            className="vh-100"
        >
            <TopbarHeader />
            <Sidebar />

            <div className="page-wrapper">
                <BreadCumb />

                <div className="container-fluid">{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
