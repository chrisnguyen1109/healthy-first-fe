import CardLayout from '@/components/CardLayout';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { BUSINESS_TYPE_OPTIONS } from '@/config';
import { useAuthentication } from '@/hooks';
import { BusinessType, FacilityFilter } from '@/types';
import { addAllOptions, removeAllOption } from '@/utils';
import { Form, Formik } from 'formik';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import SelectDistrict from './SelectDistrict';
import SelectProvince from './SelectProvince';
import SelectWard from './SelectWard';

interface FacilitySearchProps {
    onSearchChange: (data: Partial<FacilityFilter>) => void;
    onResetTable: () => void;
    formLoading: boolean;
}

const FacilitySearch: React.FC<FacilitySearchProps> = ({
    onSearchChange,
    formLoading,
    onResetTable,
}) => {
    const { data: currentAuth } = useAuthentication();

    const initialValues: Partial<FacilityFilter> = {
        _q: '',
        businessType: 'all' as BusinessType,
        districtCode: 'all' as any,
        wardCode: 'all' as any,
        provinceCode: 'all' as any,
    };

    const onSubmit = (data: Partial<FacilityFilter>) => {
        onSearchChange({
            ...data,
            businessType: removeAllOption(data.businessType),
            districtCode: removeAllOption(data.districtCode),
            provinceCode: removeAllOption(data.provinceCode),
            wardCode: removeAllOption(data.wardCode),
        });
    };

    return (
        <CardLayout>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {formik => {
                    const resetTableHandler = () => {
                        formik.resetForm();

                        onResetTable();
                    };

                    return (
                        <Form>
                            <Row xs={1} md={2} lg={3}>
                                <Col>
                                    <FormInput
                                        name="_q"
                                        label="Search"
                                        placeholder="Search facilities by name, owner, address, business type and more"
                                    />
                                </Col>
                                <Col>
                                    <FormSelect
                                        name="businessType"
                                        label="Business Type"
                                        options={addAllOptions(
                                            BUSINESS_TYPE_OPTIONS
                                        )}
                                    />
                                </Col>
                                {currentAuth?.data?.record.role && (
                                    <>
                                        <SelectProvince
                                            currentRole={
                                                currentAuth.data.record.role
                                            }
                                            isQuery
                                        />
                                        <SelectDistrict
                                            currentRole={
                                                currentAuth.data.record.role
                                            }
                                            provinceId={
                                                currentAuth.data.record
                                                    .provinceCode ??
                                                formik.values.provinceCode!
                                            }
                                            isQuery
                                        />
                                        <SelectWard
                                            districtId={
                                                currentAuth.data.record
                                                    .districtCode ??
                                                formik.values.districtCode!
                                            }
                                            isQuery
                                        />
                                    </>
                                )}
                            </Row>
                            <div className="text-end mt-2">
                                <Button
                                    variant="info"
                                    type="button"
                                    disabled={!formik.isValid || formLoading}
                                    className="text-white m-r-10"
                                    onClick={resetTableHandler}
                                >
                                    {formLoading ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        'Reset'
                                    )}
                                </Button>
                                <Button
                                    variant="danger"
                                    type="submit"
                                    disabled={!formik.isValid || formLoading}
                                    className="text-white"
                                >
                                    {formLoading ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        'Search'
                                    )}
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </CardLayout>
    );
};

export default FacilitySearch;
