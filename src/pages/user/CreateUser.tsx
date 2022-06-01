import { uploadAvatar } from '@/api/authApi';
import CardLayout from '@/components/CardLayout';
import { useAuthentication, useCreateUser } from '@/hooks';
import { UserCreate, UserRole } from '@/types';
import { Formik, FormikHelpers } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import CreateUserForm from './components/CreateUserForm';

interface UserCreateForm extends UserCreate {
    avatarFile?: File | null;
}

const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const { data: currentAuth } = useAuthentication();
    const currentRole = currentAuth?.data?.record.role;

    const { mutate } = useCreateUser({
        onSuccess: response => {
            if (response.message === 'Success' && response.data?.record) {
                toast.success('Create user successfully');
                navigate('/user');
            }
        },
    });

    if (currentRole === UserRole.EXPERT) {
        return <Navigate to="/" replace />;
    }

    const initialValues: UserCreateForm = {
        fullName: '',
        email: '',
        password: '',
        avatar: undefined,
        role:
            currentRole === UserRole.MANAGER
                ? UserRole.EXPERT
                : ('' as UserRole),
        provinceCode: currentAuth?.data?.record.provinceCode
            ? currentAuth.data.record.provinceCode
            : ('' as any),
    };

    const createUserSchema: Yup.SchemaOf<UserCreateForm> = Yup.object({
        fullName: Yup.string()
            .test('Ivalid name', 'Please enter at least 2 words', value => {
                if (!value) return true;

                const valueArr = value.split(' ');
                return !!(valueArr[0] && valueArr[1]);
            })
            .required('Full name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password contains atleast 6 characters')
            .required('Password is required'),
        role: Yup.mixed()
            .oneOf(
                Object.values(UserRole),
                'Role is either: admin, manager or expert'
            )
            .required('Role is required'),
        avatar: Yup.string().url('Invalid avatar format'),
        avatarFile: Yup.mixed(),
        districtCode: Yup.number().when('role', {
            is: UserRole.EXPERT,
            then: Yup.number()
                .integer('Invalid district')
                .positive('Invalid district')
                .required('District is required'),
        }),
        provinceCode: Yup.number().when('role', {
            is: (value: UserRole) =>
                value === UserRole.MANAGER || value === UserRole.EXPERT,
            then: Yup.number()
                .integer('Invalid province')
                .positive('Invalid province')
                .required('Province is required'),
        }),
    });

    const onSubmit = async (
        data: UserCreateForm,
        formHelper: FormikHelpers<UserCreate>
    ) => {
        try {
            formHelper.setSubmitting(true);

            if (data.avatarFile) {
                const responseUpload = await uploadAvatar(data.avatarFile);

                data.avatar = responseUpload.secure_url;
            }

            const { avatarFile, ...rest } = data;

            mutate(rest);
        } finally {
            formHelper.setSubmitting(false);
        }
    };

    return (
        <CardLayout>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={createUserSchema}
                enableReinitialize
            >
                {formik => (
                    <CreateUserForm formik={formik} currentRole={currentRole} />
                )}
            </Formik>
        </CardLayout>
    );
};

export default CreateUser;
