import { DEFAULT_FILTER } from '@/config';
import { useDeleteFacility, useFacilities } from '@/hooks';
import {
    SortChangeProps,
    SortType,
    FacilityFilter,
    FacilityQuery,
} from '@/types';
import { convertSortFilter } from '@/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FacilitySearch from './components/FacilitySearch';
import FacilityTable from './components/FacilityTable';

const FacilityList: React.FC = () => {
    const [filter, setFilter] = useState<FacilityQuery>(DEFAULT_FILTER);

    const [sortQuery, setSortQuery] = useState<Record<
        string,
        SortType | null
    > | null>(null);

    const facilitiesFilter = sortQuery
        ? {
              ...filter,
              _sort: convertSortFilter(sortQuery) as any,
          }
        : filter;

    const { data, isLoading } = useFacilities(facilitiesFilter, {
        keepPreviousData: true,
    });

    const { mutate: mutateDeleteFacility, isLoading: deletingFacility } =
        useDeleteFacility({
            onSuccess: () => {
                toast.success('Delete facility successfully!');
            },
        });

    const pageChangeHandler = (selected: number) => {
        setFilter(prev => ({
            ...prev,
            _page: selected + 1,
        }));
    };

    const pageLimitChangeHandler = (selected: number) => {
        setFilter(prev => ({
            ...prev,
            _page: 1,
            _limit: selected,
        }));
    };

    const sortUserTableHandler = ({ field, sortType }: SortChangeProps) => {
        setSortQuery(prev => ({
            ...prev,
            [field]: sortType,
        }));
    };

    const searchFacilitiesHandler = (data: Partial<FacilityFilter>) => {
        setFilter(prev => ({
            ...prev,
            _page: 1,
            ...data,
        }));
    };

    const resetSearchFacilitiesHandler = () => {
        setFilter(() => DEFAULT_FILTER);
        setSortQuery(null);
    };

    const tableLoading = isLoading || deletingFacility;

    return (
        <div>
            <FacilitySearch
                formLoading={tableLoading}
                onSearchChange={searchFacilitiesHandler}
                onResetTable={resetSearchFacilitiesHandler}
            />
            <FacilityTable
                tableLoading={tableLoading}
                facilityListResponse={data!}
                onPageChange={pageChangeHandler}
                onPageLimitChange={pageLimitChangeHandler}
                onSortChange={sortUserTableHandler}
                sortQuery={sortQuery ?? {}}
                onDeleteFacility={mutateDeleteFacility}
            />
        </div>
    );
};

export default FacilityList;
