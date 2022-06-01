import CardLayout from '@/components/CardLayout';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { CERTIFICATE_REVOKE_OPTIONS, CERTIFICATE_STATUS } from '@/config';
import { CertificateFilter } from '@/types';
import { addAllOptions, removeAllOption } from '@/utils';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { Button, Col, Row, Spinner } from 'react-bootstrap';

interface CertificateSearchProps {
    onSearchChange: (data: Partial<CertificateFilter>) => void;
    onResetTable: () => void;
    formLoading: boolean;
}

const CertificateSearch: React.FC<CertificateSearchProps> = ({
    formLoading,
    onResetTable,
    onSearchChange,
}) => {
    const initialValues: Partial<CertificateFilter> = {
        _q: '',
        status: 'all' as any,
        isRevoked: 'all' as any,
        startDate_gte: '',
        endDate_lte: '',
    };

    const onSubmit = (data: Partial<CertificateFilter>) => {
        onSearchChange({
            ...data,
            status: removeAllOption(data.status),
            isRevoked: removeAllOption(data.isRevoked),
            startDate_gte: data.startDate_gte
                ? dayjs(data.startDate_gte).format('MM/DD/YYYY')
                : undefined,
            endDate_lte: data.endDate_lte
                ? dayjs(data.endDate_lte).format('MM/DD/YYYY')
                : undefined,
        });
    };

    return (
        <CardLayout>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                                        placeholder="Search certificates by name"
                                    />
                                </Col>
                                <Col>
                                    <FormSelect
                                        name="status"
                                        label="Status"
                                        options={addAllOptions(
                                            CERTIFICATE_STATUS
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <FormSelect
                                        name="isRevoked"
                                        label="Revoked"
                                        options={addAllOptions(
                                            CERTIFICATE_REVOKE_OPTIONS
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <FormInput
                                        name="startDate_gte"
                                        label="Start date"
                                        type="date"
                                    />
                                </Col>
                                <Col>
                                    <FormInput
                                        name="endDate_lte"
                                        label="End date"
                                        type="date"
                                    />
                                </Col>
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

export default CertificateSearch;
