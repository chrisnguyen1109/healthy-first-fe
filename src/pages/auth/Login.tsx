import { signinApi } from '@/api/authApi';
import FormInput from '@/components/form/FormInput';
import { QUERY_AUTH } from '@/config';
import { LoginForm } from '@/types';
import { Form, Formik } from 'formik';
import { Button, Spinner } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';

const Login: React.FC = () => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(signinApi, {
        onSuccess: response => {
            if (response.message === 'Success' && response.data?.record) {
                queryClient.setQueryData(QUERY_AUTH, response);
            }
        },
    });

    const initialValues: LoginForm = {
        email: '',
        password: '',
    };

    const loginSchema: Yup.SchemaOf<LoginForm> = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password contains atleast 6 characters')
            .required('Password is required'),
    });

    const onSubmit = async (data: LoginForm) => {
        mutate(data);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={onSubmit}
                >
                    {formik => (
                        <Form>
                            <h2 className="text-center pb-3">Log In</h2>
                            <FormInput
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="example@gmail.com"
                            />
                            <FormInput
                                name="password"
                                label="Password"
                                type="password"
                            />
                            <div className="d-grid my-4">
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={!formik.isValid || isLoading}
                                    className="text-white"
                                >
                                    {isLoading ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        'Log in'
                                    )}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
