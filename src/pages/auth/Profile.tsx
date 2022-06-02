import { useAuthentication } from '@/hooks';
import { Col, Row } from 'react-bootstrap';
import ProfileForm from './components/ProfileForm';
import UpdateAvatar from './components/UpdateAvatar';

const Profile: React.FC = () => {
    const { data: authResponse } = useAuthentication();

    const currentAuth = authResponse?.data?.record;

    return (
        <Row>
            <Col md={5} lg={4}>
                {currentAuth && <UpdateAvatar currentAuth={currentAuth} />}
            </Col>
            <Col md={7} lg={8}>
                {currentAuth && <ProfileForm currentAuth={currentAuth} />}
            </Col>
        </Row>
    );
};

export default Profile;
