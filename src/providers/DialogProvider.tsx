import ConfirmDialog from '@/components/ConfirmDialog';
import { CallBack } from '@/types';
import { createContext, ReactNode, useState } from 'react';

interface DialogContextDefault {
    setConfirm: (message: string, callback: CallBack) => void;
}

export const DialogContext = createContext<DialogContextDefault>({
    setConfirm: () => null,
});

interface DialogProviderProps {
    children: ReactNode;
}

const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [confirmMessage, setConfirmMessage] = useState<string>('');
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogCallback, setShowDialogCallback] = useState<CallBack | null>(
        null
    );

    const setConfirm = (message: string, callback: CallBack) => {
        setConfirmMessage(message);
        setShowDialogCallback(() => callback);

        setShowDialog(true);
    };

    const callbackConfirm = () => {
        if (dialogCallback) dialogCallback();

        setShowDialog(false);
    };

    return (
        <DialogContext.Provider value={{ setConfirm }}>
            {children}
            <ConfirmDialog
                show={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={callbackConfirm}
            >
                {confirmMessage}
            </ConfirmDialog>
        </DialogContext.Provider>
    );
};

export default DialogProvider;
