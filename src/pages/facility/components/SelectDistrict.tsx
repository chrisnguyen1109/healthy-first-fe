import FormSelect from '@/components/form/FormSelect';
import { useDistrictByProvince } from '@/hooks';
import { FormType, UserRole } from '@/types';
import { addAllOptions } from '@/utils';
import { Col } from 'react-bootstrap';

interface SelectDistrictProps {
    currentRole: UserRole;
    provinceId: number;
    isQuery?: boolean;
    formType?: FormType;
}

const SelectDistrict: React.FC<SelectDistrictProps> = ({
    currentRole,
    provinceId,
    isQuery = false,
    formType,
}) => {
    const { data: districts } = useDistrictByProvince(provinceId, {
        enabled:
            !isNaN(provinceId) &&
            !!provinceId &&
            currentRole !== UserRole.EXPERT,
    });

    if (currentRole === UserRole.EXPERT) {
        return null;
    }

    const DISTRICT_OPTIONS =
        districts?.districts?.map(district => ({
            key: district.name,
            value: district.code,
        })) || [];

    return (
        <>
            {isQuery ? (
                <Col>
                    <FormSelect
                        name="districtCode"
                        label="District"
                        options={addAllOptions(DISTRICT_OPTIONS)}
                    />
                </Col>
            ) : (
                <FormSelect
                    name="districtCode"
                    label="District"
                    titleOption="Select district"
                    options={DISTRICT_OPTIONS}
                    disabled={formType === FormType.EDIT}
                />
            )}
        </>
    );
};

export default SelectDistrict;
