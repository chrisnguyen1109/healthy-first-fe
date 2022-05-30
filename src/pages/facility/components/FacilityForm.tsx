import CardLayout from '@/components/CardLayout';
import { PHONE_REG_EXP } from '@/config';
import {
    useAuthentication,
    useCreateFacility,
    useFacility,
    useUpdateFacility,
} from '@/hooks';
import { BusinessType, FacilityCreate, FormType } from '@/types';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import CreateFacilityForm from './CreateFacilityForm';

interface FacilityFormProps {
    formType: FormType;
}

interface FacilityCreateFormProps extends FacilityFormProps {
    formType: FormType.CREATE;
    id?: never;
}

interface FacilityEditFormProps extends FacilityFormProps {
    formType: FormType.EDIT;
    id: string;
}

const FacilityForm: React.FC<
    FacilityCreateFormProps | FacilityEditFormProps
> = ({ formType, id }) => {
    const { data: currentAuth } = useAuthentication();
    const navigate = useNavigate();

    const { data: facilityResponse, isLoading: loadingFacility } = useFacility(
        id!,
        {
            enabled: !!id,
        }
    );

    const facilityDetail = facilityResponse?.data?.record;

    const { mutate: createFacility, isLoading: creatingFacility } =
        useCreateFacility({
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    toast.success('Create facility successfully');
                    navigate('/facility');
                }
            },
        });

    const { mutate: updateFacility, isLoading: updatingFacility } =
        useUpdateFacility({
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    toast.success('Update facility successfully');
                    navigate('/facility');
                }
            },
        });

    const formLoading = loadingFacility || creatingFacility || updatingFacility;

    const initialValues: FacilityCreate = {
        name: facilityDetail?.name ?? '',
        owner: facilityDetail?.owner ?? '',
        address: facilityDetail?.address ?? '',
        phoneNumber: facilityDetail?.phoneNumber ?? '',
        businessType: facilityDetail?.businessType ?? ('' as BusinessType),
        provinceCode:
            facilityDetail?.provinceCode ??
            currentAuth?.data?.record.provinceCode ??
            ('' as any),
        districtCode:
            facilityDetail?.districtCode ??
            currentAuth?.data?.record.districtCode ??
            ('' as any),
        wardCode: facilityDetail?.wardCode ?? ('' as any),
        description: facilityDetail?.description ?? (undefined as any),
    };

    const createFacilitySchema: Yup.SchemaOf<FacilityCreate> = Yup.object({
        name: Yup.string().required('Facility name is required'),
        owner: Yup.string().required('Owner is required'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string()
            .matches(PHONE_REG_EXP, 'Invalid phone number format')
            .required('Address is required'),
        businessType: Yup.mixed()
            .oneOf(
                Object.values(BusinessType),
                'Business type is either: food production or food service'
            )
            .required('Business type is required'),
        description: Yup.string(),
        provinceCode: Yup.number()
            .integer('Invalid province')
            .positive('Invalid province')
            .required('Province is required'),
        districtCode: Yup.number()
            .integer('Invalid district')
            .positive('Invalid district')
            .required('District is required'),
        wardCode: Yup.number()
            .integer('Invalid ward')
            .positive('Invalid ward')
            .required('Ward is required'),
    });

    const onSunmit = async (data: FacilityCreate) => {
        if (formType === FormType.CREATE) {
            createFacility(data);
        }

        if (formType === FormType.EDIT) {
            const { provinceCode, districtCode, wardCode, ...body } = data;

            updateFacility({ id, body });
        }
    };

    return (
        <CardLayout>
            <Formik
                initialValues={initialValues}
                onSubmit={onSunmit}
                validationSchema={createFacilitySchema}
                enableReinitialize
            >
                {formik =>
                    currentAuth?.data?.record && (
                        <CreateFacilityForm
                            formik={formik}
                            currentUser={currentAuth.data.record}
                            formLoading={formLoading}
                            formType={formType}
                        />
                    )
                }
            </Formik>
        </CardLayout>
    );
};

export default FacilityForm;
