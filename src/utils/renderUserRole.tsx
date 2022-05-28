import { UserRole } from '@/types';

export const renderUserRole = (role: UserRole) => {
    switch (role) {
        case UserRole.ADMIN: {
            return <label className="badge bg-success">{role}</label>;
        }
        case UserRole.MANAGER: {
            return <label className="badge bg-danger">{role}</label>;
        }
        case UserRole.EXPERT: {
            return <label className="badge bg-purple">{role}</label>;
        }
        default: {
            return <label className="badge bg-info">Unknow</label>;
        }
    }
};
