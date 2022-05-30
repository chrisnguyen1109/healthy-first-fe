import CardLayout from '@/components/CardLayout';
import FormInput from '@/components/form/FormInput';
import FormSelect from '@/components/form/FormSelect';
import { USER_ROLE_OPTIONS } from '@/config';
import { useAuthentication } from '@/hooks';
import { UserFilter, UserRole, USER_STATUS_OPTIONS } from '@/types';
import { addAllOptions, removeAllOption } from '@/utils';
import { Form, Formik } from 'formik';
import { Button, Col, Row, Spinner } from 'react-bootstrap';

interface UserSearchProps {
    onSearchChange: (data: Partial<UserFilter>) => void;
    onResetTable: () => void;
    formLoading: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({
    onSearchChange,
    formLoading,
    onResetTable,
}) => {
    const { data: currentAuth } = useAuthentication();
    const currentRole = currentAuth?.data?.record.role;

    const initialValues: Partial<UserFilter> = {
        _q: '',
        role:
            currentRole === UserRole.MANAGER
                ? UserRole.EXPERT
                : ('all' as UserRole),
        status: 'all' as any,
    };

    const onSubmit = (data: Partial<UserFilter>) => {
        onSearchChange({
            ...data,
            role: removeAllOption(data.role),
            status: removeAllOption(data.status),
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
                                        placeholder="Search users by name, email, role, province and district"
                                    />
                                </Col>
                                {currentRole === UserRole.ADMIN && (
                                    <Col>
                                        <FormSelect
                                            name="role"
                                            label="Role"
                                            options={addAllOptions(
                                                USER_ROLE_OPTIONS
                                            )}
                                        />
                                    </Col>
                                )}
                                <Col>
                                    <FormSelect
                                        name="status"
                                        label="Status"
                                        options={addAllOptions(
                                            USER_STATUS_OPTIONS
                                        )}
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

export default UserSearch;
