import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

interface CustomModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children: ReactNode;
}

const ConfirmDialog: React.FC<CustomModalProps> = ({
    onClose,
    show,
    children,
    onConfirm,
}) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Modal show={show} onHide={onClose}>
                    <div className="confirm-dialog">
                        <button className="close" onClick={onClose}>
                            ✖
                        </button>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1004/1004739.png"
                            alt="exclamation mark"
                        />
                        <p>{children}</p>
                        <button className="accept" onClick={onConfirm}>
                            Approve
                        </button>
                    </div>
                </Modal>,
                document.body
            )}
        </>
    );
};

export default ConfirmDialog;
