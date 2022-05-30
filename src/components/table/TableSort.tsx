import { SortType } from '@/types';

interface TableSortProps {
    sortType: SortType | null;
}

const TableSort: React.FC<TableSortProps> = ({ sortType }) => {
    switch (sortType) {
        case SortType.ASC: {
            return <i className="mdi mdi-sort-ascending mx-2"></i>;
        }
        case SortType.DESC: {
            return <i className="mdi mdi-sort-descending mx-2"></i>;
        }
        default: {
            return <i className="mdi mdi-sort mx-2"></i>;
        }
    }
};

export default TableSort;
