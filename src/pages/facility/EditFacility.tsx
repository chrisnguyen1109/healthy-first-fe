import { FormType } from '@/types';
import { useParams } from 'react-router-dom';
import FacilityForm from './components/FacilityForm';

const EditFacility: React.FC = () => {
    const { id } = useParams();

    return <>{id && <FacilityForm formType={FormType.EDIT} id={id} />}</>;
};

export default EditFacility;
