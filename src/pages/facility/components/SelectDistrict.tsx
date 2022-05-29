import FormSelect from '@/components/form/FormSelect';
import { useDistrictByProvince } from '@/hooks';
import { UserRole } from '@/types';
import { addAllOptions } from '@/utils';

interface SelectDistrictProps {
    currentRole: UserRole;
    provinceId: number;
    isQuery: boolean;
}

const SelectDistrict: React.FC<SelectDistrictProps> = ({
    currentRole,
    provinceId,
    isQuery = false,
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
                <FormSelect
                    name="districtCode"
                    label="District"
                    options={addAllOptions(DISTRICT_OPTIONS)}
                />
            ) : (
                <FormSelect
                    name="districtCode"
                    label="District"
                    titleOption="Select district"
                    options={DISTRICT_OPTIONS}
                />
            )}
        </>
    );
};

export default SelectDistrict;
