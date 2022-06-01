import {
    updateCertificateCompletedStep,
    updateCertificateFailureStep,
} from '@/api/certificate';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { CERTIFICATE_STATUS, QUERY_CERTIFICATE } from '@/config';
import { CertificateStatus } from '@/types';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';

interface CompletedContentProps {
    id: string;
}

interface CompleteForm {
    status: CertificateStatus.COMPLETED | CertificateStatus.FAILURE;
    endDate?: Date;
}

const CompletedContent: React.FC<CompletedContentProps> = ({ id }) => {
    const clientQuery = useQueryClient();

    const { mutate: updateFailureStep, isLoading: updatingFailureStep } =
        useMutation(() => updateCertificateFailureStep(id), {
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    clientQuery.invalidateQueries([QUERY_CERTIFICATE, id]);
                }
            },
        });

    const { mutate: updateCompletedStep, isLoading: updatingCompletedStep } =
        useMutation(
            (endDate: Date) => updateCertificateCompletedStep(id, { endDate }),
            {
                onSuccess: response => {
                    if (
                        response.message === 'Success' &&
                        response.data?.record
                    ) {
                        clientQuery.invalidateQueries([QUERY_CERTIFICATE, id]);
                    }
                },
            }
        );

    const initialValues: CompleteForm = {
        status: '' as any,
        endDate: '' as any,
    };

    const completeFormSchema: Yup.SchemaOf<CompleteForm> = Yup.object({
        status: Yup.mixed()
            .oneOf(
                [
                    CertificateStatus.COMPLETED.toString(),
                    CertificateStatus.FAILURE.toString(),
                ],
                'Result is either: completed or failure'
            )
            .required('Status is required'),
        endDate: Yup.date().when('status', {
            is: CertificateStatus.COMPLETED.toString(),
            then: Yup.date()
                .min(new Date(), 'End date must be in the future')
                .required('Certification end date is required'),
        }),
    });

    const onSubmit = (data: CompleteForm) => {
        if (+data.status === CertificateStatus.COMPLETED) {
            updateCompletedStep(
                dayjs(data.endDate).format('MM/DD/YYYY') as any
            );
        } else {
            updateFailureStep();
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={completeFormSchema}
        >
            {formik => (
                <Form>
                    <div className="text-center my-5">
                        <h3 className="text-text-capitalize">
                            Grant food safety certification
                        </h3>
                        <h6 className="text-muted">
                            Please update this form to complete the
                            certification process
                        </h6>
                    </div>
                    <Row>
                        <Col xs={12} md={3}></Col>
                        <Col xs={12} md={6}>
                            <FormSelect
                                name="status"
                                label="Status"
                                titleOption="Select certification result"
                                options={CERTIFICATE_STATUS.slice(-2)}
                            />
                            {+formik.values.status ===
                                CertificateStatus.COMPLETED && (
                                <FormInput
                                    name="endDate"
                                    label="Certification end date"
                                    type="date"
                                />
                            )}
                        </Col>
                        <Col xs={12} md={3}></Col>
                    </Row>
                    <div className="mt-5 text-end">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={
                                !formik.isValid ||
                                updatingFailureStep ||
                                updatingCompletedStep
                            }
                            className="text-white text-capitalize"
                            size="lg"
                        >
                            {updatingFailureStep || updatingCompletedStep ? (
                                <Spinner animation="border" />
                            ) : (
                                'Finish'
                            )}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CompletedContent;
