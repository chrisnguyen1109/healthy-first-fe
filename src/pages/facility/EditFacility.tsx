import { useParams } from 'react-router-dom';

const EditFacility: React.FC = () => {
    const { id } = useParams();

    return <div>EditFacility {id}</div>;
};

export default EditFacility;
