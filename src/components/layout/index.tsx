import useResizeObserver from '@react-hook/resize-observer';
import { ReactNode, useRef, useState } from 'react';
import BreadCumb from './BreadCumb';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TopbarHeader from './TopbarHeader';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const [sideBarType, setSideBarType] = useState<'full' | 'mini-sidebar'>(
        () => (document.body.clientWidth > 1150 ? 'full' : 'mini-sidebar')
    );
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    useResizeObserver(targetRef, entry => {
        setSideBarType(() =>
            entry.contentRect.width > 1150 ? 'full' : 'mini-sidebar'
        );
    });

    return (
        <div
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin5"
            data-sidebartype={sideBarType}
            data-sidebar-position="absolute"
            data-header-position="absolute"
            data-boxed-layout="full"
            className={showSidebar ? `show-sidebar` : ''}
            ref={targetRef}
        >
            <TopbarHeader onShowSidebar={setShowSidebar} />
            <Sidebar />

            <div className="page-wrapper">
                <BreadCumb />

                <div className="container-fluid">{children}</div>

                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
