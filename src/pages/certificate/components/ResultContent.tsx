import { usePrintCertificate } from '@/hooks';
import { Certificate, CertificateStatus } from '@/types';
import { Button } from 'react-bootstrap';

interface ResultContentProps {
    id: string;
    certificate: Certificate;
}

const ResultContent: React.FC<ResultContentProps> = ({ id, certificate }) => {
    const checkSuccessCertify =
        certificate.status === CertificateStatus.COMPLETED;

    const { mutate: printCertificate } = usePrintCertificate();

    return (
        <div>
            <h1
                className={`text-center ${
                    checkSuccessCertify ? 'text-success' : 'text-warning'
                } text-uppercase`}
            >
                <strong>
                    {checkSuccessCertify ? 'Certified' : 'Not certified'}
                </strong>
            </h1>
            <div className="row justify-content-center my-5">
                <div className="col-3">
                    <img
                        src={
                            checkSuccessCertify
                                ? '/assets/images/success-certified.png'
                                : '/assets/images/error-certified.jpg'
                        }
                        className="fit-image"
                        alt=""
                    />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-7 text-center">
                    <p className="text-muted text-center text-capitalize">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                </div>
            </div>
            <div className="text-center mt-4">
                <Button
                    variant="info"
                    size="lg"
                    className="text-white"
                    onClick={() => printCertificate(id)}
                >
                    Print <i className="mdi mdi-printer"></i>
                </Button>
            </div>
        </div>
    );
};

export default ResultContent;
