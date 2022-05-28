import { ReactNode } from 'react';

interface CardLayoutProps {
    children: ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
    return (
        <div className="card">
            <div className="card-body">{children}</div>
        </div>
    );
};

export default CardLayout;
