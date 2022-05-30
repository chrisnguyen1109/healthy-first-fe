import { FormType } from '@/types';
import FacilityForm from './components/FacilityForm';

const CreateFacility: React.FC = () => {
    return <FacilityForm formType={FormType.CREATE} />;
};

export default CreateFacility;
