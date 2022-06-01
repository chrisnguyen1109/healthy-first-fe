import CardLayout from '@/components/CardLayout';
import { useCertificate } from '@/hooks';
import { CertificateStatus } from '@/types';
import { useParams } from 'react-router-dom';
import AssessingContent from './components/AssessingContent';
import CertificateStatusBar from './components/CertificateStatusBar';
import CompletedContent from './components/CompletedContent';
import ResultContent from './components/ResultContent';
import SampleContent from './components/SampleContent';
import TestingContent from './components/TestingContent';

const UpdateCertificate: React.FC = () => {
    const { id } = useParams();

    const { data: responseData, isLoading: loadingCertificate } =
        useCertificate(id!);

    const certificate = responseData?.data?.record;

    return (
        <CardLayout>
            {loadingCertificate && <div className="overlay-loader"></div>}
            <div className="mb-3">
                {certificate?.status !== CertificateStatus.COMPLETED &&
                    certificate?.status !== CertificateStatus.FAILURE && (
                        <CertificateStatusBar
                            currentStep={certificate?.status!}
                        />
                    )}
                <div className="my-3">
                    {(() => {
                        switch (certificate?.status) {
                            case CertificateStatus.INITIAL: {
                                return <TestingContent id={id!} />;
                            }
                            case CertificateStatus.TESTING: {
                                return <SampleContent id={id!} />;
                            }
                            case CertificateStatus.SAMPLE: {
                                return (
                                    certificate && (
                                        <AssessingContent
                                            id={id!}
                                            certificate={certificate}
                                        />
                                    )
                                );
                            }
                            case CertificateStatus.ASSESSING: {
                                return <CompletedContent id={id!} />;
                            }
                            default: {
                                return (
                                    certificate && (
                                        <ResultContent
                                            id={id!}
                                            certificate={certificate}
                                        />
                                    )
                                );
                            }
                        }
                    })()}
                </div>
            </div>
        </CardLayout>
    );
};

export default UpdateCertificate;
