import { SortType } from '@/types';

export const convertSortFilter = (
    sortQuery: Record<string, SortType | null>
) => {
    const sortQueryArr: string[] = [];

    for (const [key, value] of Object.entries(sortQuery)) {
        switch (value) {
            case SortType.ASC: {
                sortQueryArr.push(key);
                break;
            }
            case SortType.DESC: {
                sortQueryArr.push(`-${key}`);
                break;
            }
        }
    }

    return sortQueryArr;
};
