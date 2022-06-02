import CardLayout from '@/components/CardLayout';
import FormInput from '@/components/form/FormInput';
import { useUpdateProfile } from '@/hooks';
import { UpdateProfileForm, User } from '@/types';
import { Form, Formik } from 'formik';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface ProfileFormProps {
    currentAuth: User;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ currentAuth }) => {
    const { mutate: updateProfile, isLoading: updatingProfile } =
        useUpdateProfile({
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    toast.success('Update profile successfully!');
                }
            },
        });

    const initialValues: Omit<UpdateProfileForm, 'avatar'> = {
        email: currentAuth.email,
        fullName: currentAuth.fullName,
        password: '',
        newPassword: '',
    };

    const updateProfileSchema: Yup.SchemaOf<
        Omit<UpdateProfileForm, 'email' | 'avatar'>
    > = Yup.object({
        fullName: Yup.string().test(
            'Ivalid name',
            'Please enter at least 2 words',
            value => {
                if (!value) return false;

                const valueArr = value.split(' ');
                return !!(valueArr[0] && valueArr[1]);
            }
        ),
        password: Yup.string().min(6, 'Password contains atleast 6 characters'),
        newPassword: Yup.string().when('password', {
            is: (value: string) => !!value,
            then: Yup.string()
                .min(6, 'New password contains atleast 6 characters')
                .required('New password is required'),
        }),
    });

    const onSubmit = (data: Omit<UpdateProfileForm, 'avatar'>) => {
        const { fullName, password, newPassword } = data;
        updateProfile({
            fullName,
            password: password || undefined,
            newPassword: newPassword || undefined,
        });
    };

    return (
        <CardLayout>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={updateProfileSchema}
                enableReinitialize
            >
                {formik => (
                    <Form>
                        <FormInput
                            name="email"
                            label="Email"
                            type="email"
                            readOnly
                            placeholder="example@gmail.com"
                        />
                        <FormInput
                            name="fullName"
                            label="Full Name"
                            placeholder="Chris Nguyen"
                        />
                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <FormInput
                            name="newPassword"
                            label="New Password"
                            type="password"
                        />
                        <div className="my-4">
                            <Button
                                variant="success"
                                type="submit"
                                disabled={!formik.isValid || updatingProfile}
                                className="text-white"
                            >
                                {updatingProfile ? (
                                    <Spinner animation="border" />
                                ) : (
                                    'Update Profile'
                                )}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CardLayout>
    );
};

export default ProfileForm;
