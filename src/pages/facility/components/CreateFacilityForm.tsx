import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { BUSINESS_TYPE_OPTIONS } from '@/config';
import { FacilityCreate, FormType, User } from '@/types';
import { Form, FormikProps } from 'formik';
import { Button, Spinner } from 'react-bootstrap';
import SelectDistrict from './SelectDistrict';
import SelectProvince from './SelectProvince';
import SelectWard from './SelectWard';

interface CreateFacilityFormProps {
    formik: FormikProps<FacilityCreate>;
    currentUser: User;
    formLoading?: boolean;
    formType: FormType;
}

const CreateFacilityForm: React.FC<CreateFacilityFormProps> = ({
    formik,
    currentUser,
    formLoading = false,
    formType,
}) => {
    return (
        <Form>
            <FormInput
                name="name"
                label="Facility Name"
                placeholder="Vinmart"
            />
            <FormInput name="owner" label="Owner" placeholder="John Doe" />
            <FormInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="0123456"
            />
            <FormSelect
                name="businessType"
                label="Business Type"
                titleOption="Select business type"
                options={BUSINESS_TYPE_OPTIONS}
            />
            <SelectProvince
                currentRole={currentUser.role}
                formType={formType}
            />
            <SelectDistrict
                currentRole={currentUser.role}
                provinceId={
                    currentUser.provinceCode ?? formik.values.provinceCode!
                }
                formType={formType}
            />
            <SelectWard
                districtId={formik.values.districtCode!}
                formType={formType}
            />
            <FormInput
                name="address"
                label="Address"
                as="textarea"
                placeholder="Leave your address here"
                rows={3}
            />
            <FormInput
                name="description"
                label="Description"
                as="textarea"
                placeholder="Leave your description here"
                rows={3}
            />
            <div className="my-4">
                <Button
                    variant="success"
                    type="submit"
                    disabled={!formik.isValid || formLoading}
                    className="text-white text-capitalize"
                >
                    {formLoading ? (
                        <Spinner animation="border" />
                    ) : (
                        `${formType} facility`
                    )}
                </Button>
            </div>
        </Form>
    );
};

export default CreateFacilityForm;
