import { updateCertificateSampleStep } from '@/api/certificate';
import FormInput from '@/components/form/FormInput';
import { QUERY_CERTIFICATE } from '@/config';
import { InspectedFoods } from '@/types';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import TextErrorArrayField from './TextErrorArrayField';

interface SampleContentProps {
    id: string;
}

export interface SampleContentForm {
    inspectedFoods: Pick<InspectedFoods, 'name' | 'organization' | 'notes'>[];
}

const SampleContent: React.FC<SampleContentProps> = ({ id }) => {
    const clientQuery = useQueryClient();

    const { mutate: updateCertificateStep, isLoading: updatingStep } =
        useMutation(
            (body: SampleContentForm) => updateCertificateSampleStep(id, body),
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

    const initialValues: SampleContentForm = {
        inspectedFoods: [
            {
                name: '',
                organization: '',
            },
        ],
    };

    const sampleContentFormSchema: Yup.SchemaOf<SampleContentForm> = Yup.object(
        {
            inspectedFoods: Yup.array()
                .of(
                    Yup.object({
                        name: Yup.string().required('Name is required'),
                        organization: Yup.string().required(
                            'Organization is required'
                        ),
                        notes: Yup.string(),
                    })
                )
                .min(1),
        }
    );

    const onSubmit = (data: SampleContentForm) => {
        updateCertificateStep(data);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={sampleContentFormSchema}
        >
            {formik => (
                <Form>
                    <FieldArray name="inspectedFoods">
                        {arrayHelpers => (
                            <>
                                {formik.values.inspectedFoods.map(
                                    (_, index) => (
                                        <React.Fragment key={index}>
                                            <FormInput
                                                name={`inspectedFoods[${index}].name`}
                                                label="Name"
                                                placeholder="Food"
                                            />
                                            <ErrorMessage
                                                name={`inspectedFoods[${index}].name`}
                                            >
                                                {msg => (
                                                    <TextErrorArrayField>
                                                        {msg}
                                                    </TextErrorArrayField>
                                                )}
                                            </ErrorMessage>
                                            <FormInput
                                                name={`inspectedFoods[${index}].organization`}
                                                label="Organization"
                                                placeholder="Organization"
                                            />
                                            <ErrorMessage
                                                name={`inspectedFoods[${index}].organization`}
                                            >
                                                {msg => (
                                                    <TextErrorArrayField>
                                                        {msg}
                                                    </TextErrorArrayField>
                                                )}
                                            </ErrorMessage>
                                            <FormInput
                                                name={`inspectedFoods[${index}].notes`}
                                                label="Notes"
                                                placeholder="Leave your notes here"
                                                as="textarea"
                                                rows={3}
                                            />
                                            {formik.values.inspectedFoods
                                                .length > 1 && (
                                                <div className="my-3 text-end">
                                                    <Button
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index
                                                            )
                                                        }
                                                        variant="danger"
                                                        className="text-white"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                                <div>
                                    <Button
                                        onClick={() =>
                                            arrayHelpers.push(
                                                initialValues.inspectedFoods[0]
                                            )
                                        }
                                        className="btn-circle d-flex justify-content-center align-items-center"
                                    >
                                        <i className="mdi mdi-plus mdi-24px" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </FieldArray>
                    <div className="mt-5 text-end">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!formik.isValid || updatingStep}
                            className="text-white text-capitalize"
                            size="lg"
                        >
                            {updatingStep ? (
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

export default SampleContent;
