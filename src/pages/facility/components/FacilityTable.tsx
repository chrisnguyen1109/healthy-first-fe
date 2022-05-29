import CustomTable from '@/components/CustomTable';
import { DEFAULT_PAGINATION } from '@/config';
import { useDialog } from '@/hooks';
import {
    BusinessType,
    ColumnsType,
    Facility,
    FacilityListResponse,
    ResponseData,
    SortChangeProps,
    SortType,
} from '@/types';
import { renderFacilityType } from '@/utils';
import { Button } from 'react-bootstrap';
import { UseMutateFunction } from 'react-query';
import { Link } from 'react-router-dom';

interface FacilityTableProps {
    facilityListResponse: FacilityListResponse;
    tableLoading: boolean;
    onPageChange: (selected: number) => void;
    onPageLimitChange: (selected: number) => void;
    onSortChange: (sortObject: SortChangeProps) => void;
    sortQuery: Record<string, SortType | null>;
    onDeleteFacility: UseMutateFunction<
        ResponseData<null>,
        unknown,
        string,
        unknown
    >;
}

const FacilityTable: React.FC<FacilityTableProps> = ({
    facilityListResponse,
    tableLoading,
    onPageChange,
    onPageLimitChange,
    onSortChange,
    sortQuery,
    onDeleteFacility,
}) => {
    const { setConfirm } = useDialog();

    const columns: ColumnsType<Facility>[] = [
        {
            key: 'name',
            title: 'Facility name',
            render: (value: string) => <h5 className="m-b-0">{value}</h5>,
            showSort: true,
            sortType: sortQuery['name'],
        },
        {
            key: 'owner',
            title: 'Owner',
            showSort: true,
            sortType: sortQuery['owner'],
        },
        {
            key: 'phoneNumber',
            title: 'Phone number',
            showSort: true,
            sortType: sortQuery['phoneNumber'],
        },
        {
            key: 'businessType',
            title: 'Business type',
            render: (value: BusinessType) => renderFacilityType(value),
            showSort: true,
            sortType: sortQuery['businessType'],
        },
        {
            key: 'provinceName',
            title: 'Province name',
            showSort: true,
            sortType: sortQuery['provinceName'],
        },
        {
            key: 'districtName',
            title: 'District name',
            showSort: true,
            sortType: sortQuery['districtName'],
        },
        {
            key: 'wardName',
            title: 'Ward name',
            showSort: true,
            sortType: sortQuery['wardName'],
        },
        {
            key: 'address',
            title: 'Address',
            width: 100,
            render: (value: string) => (
                <div className="text-ellipsis">{value}</div>
            ),
        },
    ];

    const deleteFacility = (id: string) => {
        setConfirm('Are you sure you want to delete this facility?', () =>
            onDeleteFacility(id)
        );
    };

    const controls = (
        <Link to="/facility/create">
            <Button className="text-white">New Facility</Button>
        </Link>
    );

    const actions = (data: Facility) => (
        <div className="d-flex gap-3 justify-content-center">
            <Link to={`/facility/edit/${data._id}`}>
                <Button variant="outline-info" size="sm" title="Edit facility">
                    <i className="ti-pencil-alt"></i>
                </Button>
            </Link>
            <Button
                variant="outline-danger"
                size="sm"
                title="Delete facility"
                onClick={() => deleteFacility(data._id)}
            >
                <i className="mdi mdi-delete-forever"></i>
            </Button>
        </div>
    );

    return (
        <CustomTable
            columns={columns}
            dataSource={facilityListResponse?.data?.records || []}
            pagination={
                facilityListResponse?.data?.pagination || DEFAULT_PAGINATION
            }
            title="Facility Table"
            subtitle="Overview of Facility Table"
            control={controls}
            actions={actions}
            isLoading={tableLoading}
            onPageChange={onPageChange}
            onPageLimitChange={onPageLimitChange}
            onSortChange={onSortChange}
        />
    );
};

export default FacilityTable;
