import { updateCertificateTestingStep } from '@/api/certificate';
import { QUERY_CERTIFICATE } from '@/config';
import { Button, Spinner } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';

interface TestingContentProps {
    id: string;
}

const TestingContent: React.FC<TestingContentProps> = ({ id }) => {
    const clientQuery = useQueryClient();

    const { mutate: updateCertificateStep, isLoading: updatingStep } =
        useMutation(() => updateCertificateTestingStep(id), {
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    clientQuery.invalidateQueries([QUERY_CERTIFICATE, id]);
                }
            },
        });

    return (
        <div>
            <h2 className="text-center text-purple text-uppercase">
                <strong>Proceed to checkout !</strong>
            </h2>
            <div className="row justify-content-center my-5">
                <div className="col-3">
                    <img
                        src="/assets/images/testing.png"
                        className="fit-image"
                        alt=""
                    />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-7 text-center">
                    <h5 className="text-muted text-center text-capitalize">
                        Please press the next button to continue with the
                        certification process
                    </h5>
                </div>
            </div>

            <div className="mt-5 text-end">
                <Button
                    variant="primary"
                    type="submit"
                    disabled={updatingStep}
                    className="text-white text-capitalize"
                    size="lg"
                    onClick={() => updateCertificateStep()}
                >
                    {updatingStep ? (
                        <Spinner animation="border" />
                    ) : (
                        'Next step'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default TestingContent;
