import { CertificateStatus } from '@/types';

export const renderCertificateStatus = (status: CertificateStatus) => {
    switch (status) {
        case CertificateStatus.INITIAL: {
            return <label className="badge bg-info">Initial</label>;
        }
        case CertificateStatus.TESTING: {
            return <label className="badge bg-secondary">Testing</label>;
        }
        case CertificateStatus.SAMPLE: {
            return <label className="badge bg-primary">Sample</label>;
        }
        case CertificateStatus.ASSESSING: {
            return <label className="badge bg-purple">Assessing</label>;
        }
        case CertificateStatus.COMPLETED: {
            return <label className="badge bg-success">Completed</label>;
        }
        case CertificateStatus.FAILURE: {
            return <label className="badge bg-danger">Failure</label>;
        }
        default: {
            return <label className="badge bg-dark">Unknow</label>;
        }
    }
};
