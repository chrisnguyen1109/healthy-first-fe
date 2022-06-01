import { ReactNode } from 'react';

interface TextErrorArrayFieldProps {
    children: ReactNode;
}

const TextErrorArrayField: React.FC<TextErrorArrayFieldProps> = ({
    children,
}) => {
    return (
        <p className="text-danger" style={{ marginTop: '-10px' }}>
            {children}
        </p>
    );
};

export default TextErrorArrayField;
