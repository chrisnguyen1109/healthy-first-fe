import FormSelect from '@/components/form/FormSelect';
import { useWardByDistrict } from '@/hooks';
import { FormType } from '@/types';
import { addAllOptions } from '@/utils';
import { Col } from 'react-bootstrap';

interface SelectWardProps {
    districtId: number;
    isQuery?: boolean;
    formType?: FormType;
}

const SelectWard: React.FC<SelectWardProps> = ({
    districtId,
    isQuery = false,
    formType,
}) => {
    const { data: wards } = useWardByDistrict(districtId, {
        enabled: !isNaN(districtId) && !!districtId,
    });

    const WARD_OPTIONS =
        wards?.wards?.map(ward => ({
            key: ward.name,
            value: ward.code,
        })) || [];

    return (
        <>
            {isQuery ? (
                <Col>
                    <FormSelect
                        name="wardCode"
                        label="Ward"
                        options={addAllOptions(WARD_OPTIONS)}
                    />
                </Col>
            ) : (
                <FormSelect
                    name="wardCode"
                    label="Ward"
                    titleOption="Select ward"
                    options={WARD_OPTIONS}
                    disabled={formType === FormType.EDIT}
                />
            )}
        </>
    );
};

export default SelectWard;
