import FormSelect from '@/components/form/FormSelect';
import { useWardByDistrict } from '@/hooks';
import { addAllOptions } from '@/utils';

interface SelectWardProps {
    districtId: number;
    isQuery: boolean;
}

const SelectWard: React.FC<SelectWardProps> = ({
    districtId,
    isQuery = false,
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
                <FormSelect
                    name="wardCode"
                    label="Ward"
                    options={addAllOptions(WARD_OPTIONS)}
                />
            ) : (
                <FormSelect
                    name="wardCode"
                    label="Ward"
                    titleOption="Select ward"
                    options={WARD_OPTIONS}
                />
            )}
        </>
    );
};

export default SelectWard;
