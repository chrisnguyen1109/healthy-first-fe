import { DialogContext } from '@/providers/DialogProvider';
import { useContext } from 'react';

export const useDialog = () => useContext(DialogContext);
