import FormSelect from '@/components/form/FormSelect';
import { useProvince } from '@/hooks';
import { FormType, UserRole } from '@/types';
import { addAllOptions } from '@/utils';
import { Col } from 'react-bootstrap';

interface SelectProvinceProps {
    currentRole: UserRole;
    isQuery?: boolean;
    formType?: FormType;
}

const SelectProvince: React.FC<SelectProvinceProps> = ({
    currentRole,
    isQuery = false,
    formType,
}) => {
    const { data: provinces } = useProvince({
        enabled: currentRole === UserRole.ADMIN,
    });

    if (currentRole !== UserRole.ADMIN) {
        return null;
    }

    const PROVINCE_OPTIONS =
        provinces?.map(province => ({
            key: province.name,
            value: province.code,
        })) || [];

    return (
        <>
            {isQuery ? (
                <Col>
                    <FormSelect
                        name="provinceCode"
                        label="Province"
                        options={addAllOptions(PROVINCE_OPTIONS)}
                    />
                </Col>
            ) : (
                <FormSelect
                    name="provinceCode"
                    label="Province"
                    titleOption="Select province"
                    options={PROVINCE_OPTIONS}
                    disabled={formType === FormType.EDIT}
                />
            )}
        </>
    );
};

export default SelectProvince;
