import { CertificateStatus } from '@/types';

interface CertificateStatusBarProps {
    currentStep: CertificateStatus;
}

const CertificateStatusBar: React.FC<CertificateStatusBarProps> = ({
    currentStep,
}) => {
    const activeIconClass = (status: CertificateStatus) =>
        currentStep === status ? 'btn-info' : 'btn-secondary';

    const activeBarClass = (status: CertificateStatus) =>
        currentStep === status ? 'bg-cyan' : 'bg-grey';

    return (
        <ul className="d-flex list-style-none gap-3">
            <li className="w-25 cursor-pointer">
                <span
                    className={`btn ${activeIconClass(
                        CertificateStatus.INITIAL
                    )} btn-circle d-flex align-items-center m-auto`}
                >
                    <i className="mdi mdi-calendar-multiple-check fs-4 text-white"></i>
                </span>
                <div
                    className={`d-inline-block w-100 ${activeBarClass(
                        CertificateStatus.INITIAL
                    )} rounded-pill`}
                    style={{ height: '5px' }}
                ></div>
            </li>
            <li className="w-25 cursor-pointer">
                <span
                    className={`btn ${activeIconClass(
                        CertificateStatus.TESTING
                    )} btn-circle d-flex align-items-center m-auto`}
                >
                    <i className="mdi mdi-playlist-plus fs-4 text-white"></i>
                </span>
                <div
                    className={`d-inline-block w-100 ${activeBarClass(
                        CertificateStatus.TESTING
                    )} rounded-pill`}
                    style={{ height: '5px' }}
                ></div>
            </li>
            <li className="w-25 cursor-pointer">
                <span
                    className={`btn ${activeIconClass(
                        CertificateStatus.SAMPLE
                    )} btn-circle d-flex align-items-center m-auto`}
                >
                    <i className="mdi mdi-test-tube fs-4 text-white"></i>
                </span>
                <div
                    className={`d-inline-block w-100 ${activeBarClass(
                        CertificateStatus.SAMPLE
                    )} rounded-pill`}
                    style={{ height: '5px' }}
                ></div>
            </li>
            <li className="w-25 cursor-pointer">
                <span
                    className={`btn ${activeIconClass(
                        CertificateStatus.ASSESSING
                    )} btn-circle d-flex align-items-center m-auto`}
                >
                    <i className="mdi  mdi-checkbox-marked-circle-outline fs-4 text-white"></i>
                </span>
                <div
                    className={`d-inline-block w-100 ${activeBarClass(
                        CertificateStatus.ASSESSING
                    )} rounded-pill`}
                    style={{ height: '5px' }}
                ></div>
            </li>
        </ul>
    );
};

export default CertificateStatusBar;
