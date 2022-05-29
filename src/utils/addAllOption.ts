import { FormOptions } from '@/types';

export const addAllOptions = (options: FormOptions[]) => [
    {
        key: 'All',
        value: 'all',
    },
    ...options,
];
