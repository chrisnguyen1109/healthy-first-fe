import FormSelect from '@/components/form/FormSelect';
import { useProvince } from '@/hooks';
import { UserRole } from '@/types';
import { addAllOptions } from '@/utils';

interface SelectProvinceProps {
    currentRole: UserRole;
    isQuery: boolean;
}

const SelectProvince: React.FC<SelectProvinceProps> = ({
    currentRole,
    isQuery = false,
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
                <FormSelect
                    name="provinceCode"
                    label="Province"
                    options={addAllOptions(PROVINCE_OPTIONS)}
                />
            ) : (
                <FormSelect
                    name="provinceCode"
                    label="Province"
                    titleOption="Select province"
                    options={PROVINCE_OPTIONS}
                />
            )}
        </>
    );
};

export default SelectProvince;
