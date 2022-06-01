import { revokeCertificateFacility } from '@/api/certificate';
import { DEFAULT_FILTER, QUERY_FACILITY } from '@/config';
import {
    useCreateCertificate,
    useDeleteFacility,
    useFacilities,
} from '@/hooks';
import {
    SortChangeProps,
    SortType,
    FacilityFilter,
    FacilityQuery,
} from '@/types';
import { convertSortFilter } from '@/utils';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FacilitySearch from './components/FacilitySearch';
import FacilityTable from './components/FacilityTable';

const FacilityList: React.FC = () => {
    const clientQuery = useQueryClient();
    const [filter, setFilter] = useState<FacilityQuery>(DEFAULT_FILTER);
    const navigate = useNavigate();

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

    const { mutate: createCertificate, isLoading: creatingCertificate } =
        useCreateCertificate({
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    navigate(`/certificate/edit/${response.data.record._id}`);
                }
            },
        });

    const { mutate: revokeCertificate, isLoading: revokingCertificate } =
        useMutation((id: string) => revokeCertificateFacility(id), {
            onSuccess: response => {
                if (response.message === 'Success' && response.data?.record) {
                    toast.success(
                        'Revoke certificate of this facility successfully!'
                    );
                    clientQuery.invalidateQueries([QUERY_FACILITY]);
                }
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

    const tableLoading =
        isLoading ||
        deletingFacility ||
        creatingCertificate ||
        revokingCertificate;

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
                onCreateCertificate={createCertificate}
                onRevokeCertificate={revokeCertificate}
            />
        </div>
    );
};

export default FacilityList;
