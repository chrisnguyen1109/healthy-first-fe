import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { useDistrictByProvince, useProvince } from '@/hooks';
import { UserCreate, UserRole, USER_ROLE_OPTIONS } from '@/types';
import { Form, FormikProps } from 'formik';
import { Button, Spinner } from 'react-bootstrap';
import UploadAvatar from './UploadAvatar';

interface CreateUserFormProps {
    formik: FormikProps<UserCreate>;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ formik }) => {
    const checkProvinceList =
        formik.values.role === UserRole.MANAGER ||
        formik.values.role === UserRole.EXPERT;

    const checkDistrictList =
        formik.values.role === UserRole.EXPERT && formik.values.provinceCode;

    const { data: provinces, isLoading: loadingProvinces } = useProvince({
        enabled: checkProvinceList,
    });
    const { data: districts, isLoading: loadingDistricts } =
        useDistrictByProvince(formik.values.provinceCode!, {
            enabled: !!checkDistrictList,
        });

    const formLoading =
        loadingProvinces || loadingDistricts || formik.isSubmitting;

    const PROVINCE_OPTIONS =
        provinces?.map(province => ({
            key: province.name,
            value: province.code,
        })) || [];

    const DISTRICT_OPTIONS =
        districts?.districts?.map(district => ({
            key: district.name,
            value: district.code,
        })) || [];

    return (
        <Form>
            <FormInput
                name="fullName"
                label="Full Name"
                placeholder="Chris Nguyen"
            />
            <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="example@gmail.com"
            />
            <FormInput name="password" label="Password" type="password" />
            <FormSelect
                name="role"
                label="Role"
                titleOption="Select role"
                options={USER_ROLE_OPTIONS}
            />
            <UploadAvatar setFieldValue={formik.setFieldValue} />
            {checkProvinceList && (
                <FormSelect
                    name="provinceCode"
                    label="Province"
                    titleOption="Select province"
                    options={PROVINCE_OPTIONS}
                />
            )}
            {formik.values.role === UserRole.EXPERT && (
                <FormSelect
                    name="districtCode"
                    label="District"
                    titleOption="Select district"
                    options={DISTRICT_OPTIONS}
                />
            )}
            <div className="my-4">
                <Button
                    variant="success"
                    type="submit"
                    disabled={!formik.isValid || formLoading}
                    className="text-white"
                >
                    {formLoading ? (
                        <Spinner animation="border" />
                    ) : (
                        'Create User'
                    )}
                </Button>
            </div>
        </Form>
    );
};

export default CreateUserForm;
