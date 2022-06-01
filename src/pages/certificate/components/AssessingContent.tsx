import {
    updateCertificateAssessingStep,
    updateCertificateFood,
} from '@/api/certificate';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { FOOD_STATUS_OPTIONS, QUERY_CERTIFICATE } from '@/config';
import { Certificate, InspectedFoods, InspectStatus } from '@/types';
import dayjs from 'dayjs';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import TextErrorArrayField from './TextErrorArrayField';

interface AssessingContentProps {
    id: string;
    certificate: Certificate;
}

interface UpdateFoodProps {
    foodId: string;
    body: Pick<InspectedFoods, 'status' | 'notes'>;
}

export interface AssessingContentForm {
    inspectedFoods: InspectedFoods[];
}

const AssessingContent: React.FC<AssessingContentProps> = ({
    id,
    certificate,
}) => {
    const clientQuery = useQueryClient();

    const inspectedFoods = certificate.inspectedFoods || [];

    const { mutate: mutateFood, isLoading: updatingFood } = useMutation(
        ({ foodId, body }: UpdateFoodProps) =>
            updateCertificateFood(id, foodId, body),
        {
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    clientQuery.invalidateQueries([QUERY_CERTIFICATE, id]);
                }
            },
        }
    );

    const { mutate: updateCertificateStep, isLoading: updatingStep } =
        useMutation(
            (body: AssessingContentForm) =>
                updateCertificateAssessingStep(id, body),
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

    const initialValues: AssessingContentForm = {
        inspectedFoods: inspectedFoods.map(food => ({
            ...food,
            resultDate:
                food.resultDate &&
                (dayjs(food.resultDate).format('YYYY-MM-DD') as any),
        })),
    };

    const sampleContentFormSchema: Yup.SchemaOf<AssessingContentForm> =
        Yup.object({
            inspectedFoods: Yup.array()
                .of(
                    Yup.object({
                        _id: Yup.string().required('Id is required'),
                        name: Yup.string().required('Name is required'),
                        organization: Yup.string().required(
                            'Organization is required'
                        ),
                        notes: Yup.string(),
                        status: Yup.mixed()
                            .oneOf(
                                [
                                    InspectStatus.COMPLETED,
                                    InspectStatus.FAILURE,
                                ],
                                'Status is either: failure or completed'
                            )
                            .required('Business type is required'),
                        resultDate: Yup.date().required(
                            'Result date is required'
                        ),
                    })
                )
                .min(1),
        });

    const updateFood = (food: InspectedFoods) => {
        mutateFood({
            foodId: food._id,
            body: { status: food.status, notes: food.notes },
        });
    };

    const onSubmit = (data: AssessingContentForm) => {
        updateCertificateStep(data);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={sampleContentFormSchema}
            enableReinitialize
        >
            {formik => (
                <Form>
                    <FieldArray name="inspectedFoods">
                        {() => (
                            <>
                                {formik.values.inspectedFoods.map(
                                    (_, index) => (
                                        <Row key={index} className="mt-3 mb-4">
                                            <Col xs={12}>
                                                <FormInput
                                                    name={`inspectedFoods[${index}]._id`}
                                                    label="Id"
                                                    plaintext
                                                    readOnly
                                                />
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <FormInput
                                                    name={`inspectedFoods[${index}].name`}
                                                    label="Name"
                                                    readOnly
                                                />
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <FormInput
                                                    name={`inspectedFoods[${index}].organization`}
                                                    label="Organization"
                                                    readOnly
                                                />
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <FormInput
                                                    name={`inspectedFoods[${index}].resultDate`}
                                                    label="Result date"
                                                    readOnly
                                                    type="date"
                                                />
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <FormSelect
                                                    name={`inspectedFoods[${index}].status`}
                                                    label="Status"
                                                    options={
                                                        FOOD_STATUS_OPTIONS
                                                    }
                                                />
                                                <ErrorMessage
                                                    name={`inspectedFoods[${index}].status`}
                                                >
                                                    {msg => (
                                                        <TextErrorArrayField>
                                                            {msg}
                                                        </TextErrorArrayField>
                                                    )}
                                                </ErrorMessage>
                                            </Col>
                                            <Col xs={12}>
                                                <FormInput
                                                    name={`inspectedFoods[${index}].notes`}
                                                    label="Notes"
                                                    placeholder="Leave your notes here"
                                                    as="textarea"
                                                    rows={3}
                                                />
                                            </Col>
                                            <div className="my-3 text-end">
                                                <Button
                                                    variant="success"
                                                    className="text-white"
                                                    onClick={() =>
                                                        updateFood(
                                                            formik.values
                                                                .inspectedFoods[
                                                                index
                                                            ]
                                                        )
                                                    }
                                                >
                                                    Checkout
                                                </Button>
                                            </div>
                                        </Row>
                                    )
                                )}
                            </>
                        )}
                    </FieldArray>
                    <div className="mt-5 text-end">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={
                                !formik.isValid || updatingStep || updatingFood
                            }
                            className="text-white text-capitalize"
                            size="lg"
                        >
                            {updatingStep || updatingFood ? (
                                <Spinner animation="border" />
                            ) : (
                                'Next step'
                            )}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AssessingContent;
