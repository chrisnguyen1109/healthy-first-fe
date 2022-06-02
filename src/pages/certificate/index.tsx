import { DEFAULT_FILTER } from '@/config';
import { useCertificates, usePrintCertificate } from '@/hooks';
import {
    CertificateFilter,
    CertificateQuery,
    SortChangeProps,
    SortType,
} from '@/types';
import { convertSortFilter } from '@/utils';
import { useState } from 'react';
import CertificateSearch from './components/CertificateSearch';
import CertificateTable from './components/CertificateTable';

const CertificateList: React.FC = () => {
    const [filter, setFilter] = useState<CertificateQuery>(DEFAULT_FILTER);

    const [sortQuery, setSortQuery] = useState<Record<
        string,
        SortType | null
    > | null>(null);

    const certificatesFilter = sortQuery
        ? {
              ...filter,
              _sort: convertSortFilter(sortQuery) as any,
          }
        : filter;

    const { data, isLoading } = useCertificates(certificatesFilter, {
        keepPreviousData: true,
    });

    const { mutate: printCertificate } = usePrintCertificate();

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

    const searchFacilitiesHandler = (data: Partial<CertificateFilter>) => {
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

    return (
        <div>
            <CertificateSearch
                formLoading={isLoading}
                onSearchChange={searchFacilitiesHandler}
                onResetTable={resetSearchFacilitiesHandler}
            />
            <CertificateTable
                tableLoading={isLoading}
                certtificateListResponse={data!}
                onPageChange={pageChangeHandler}
                onPageLimitChange={pageLimitChangeHandler}
                onSortChange={sortUserTableHandler}
                sortQuery={sortQuery ?? {}}
                onPrintCertificate={printCertificate}
            />
        </div>
    );
};

export default CertificateList;
