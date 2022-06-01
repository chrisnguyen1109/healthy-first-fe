import { FacilityCertificate } from '@/types';

export const renderFacilityCertificate = (
    facilityCertificate: FacilityCertificate
) => {
    switch (facilityCertificate) {
        case FacilityCertificate.NO_CERTIFICATE: {
            return (
                <label className="badge bg-danger">{facilityCertificate}</label>
            );
        }
        case FacilityCertificate.PENDING: {
            return (
                <label className="badge bg-info">{facilityCertificate}</label>
            );
        }
        case FacilityCertificate.CERTIFIED: {
            return (
                <label className="badge bg-success">
                    {facilityCertificate}
                </label>
            );
        }
        case FacilityCertificate.EXPIRED: {
            return (
                <label className="badge bg-secondary">
                    {facilityCertificate}
                </label>
            );
        }
        case FacilityCertificate.REVOKED: {
            return (
                <label className="badge bg-purple">{facilityCertificate}</label>
            );
        }
        default: {
            return <label className="badge bg-dark">Unknow</label>;
        }
    }
};
