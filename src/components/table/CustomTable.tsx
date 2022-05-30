import {
    ColumnsType,
    HasId,
    Pagination,
    SortChangeProps,
    SortType,
} from '@/types';
import { ReactNode } from 'react';
import CardLayout from '../CardLayout';
import TablePagination from './TablePagination';
import TableSort from './TableSort';

interface DataType extends HasId {
    [key: string]: any;
}

interface CustomTableProps {
    title: string;
    subtitle?: ReactNode;
    control?: ReactNode;
    columns: ColumnsType[];
    dataSource: DataType[];
    actions?: (data: any) => ReactNode;
    isLoading?: boolean;
    onSortChange: (sortObject: SortChangeProps) => void;
}

interface CustomTableWithoutPaginationProps extends CustomTableProps {
    showPagination: false;
    onPageChange?: never;
    pagination?: never;
    onPageLimitChange?: never;
}

interface CustomTableWithPaginationProps extends CustomTableProps {
    showPagination?: true;
    onPageChange: (selected: number) => void;
    pagination: Pagination;
    onPageLimitChange: (selected: number) => void;
}

const CustomTable: React.FC<
    CustomTableWithoutPaginationProps | CustomTableWithPaginationProps
> = ({
    title,
    subtitle,
    control,
    columns,
    dataSource,
    actions,
    isLoading,
    pagination,
    onPageChange,
    onPageLimitChange,
    showPagination = true,
    onSortChange,
}) => {
    const sortChangeHandler = (column: ColumnsType) => {
        if (!column.showSort) return;

        switch (column.sortType) {
            case SortType.ASC: {
                return onSortChange({
                    field: column.key,
                    sortType: SortType.DESC,
                });
            }
            case SortType.DESC: {
                return onSortChange({
                    field: column.key,
                    sortType: null,
                });
            }
            default: {
                return onSortChange({
                    field: column.key,
                    sortType: SortType.ASC,
                });
            }
        }
    };

    return (
        <CardLayout>
            {isLoading && <div className="overlay-loader"></div>}
            <div className="d-md-flex">
                <div>
                    <h4 className="card-title">{title}</h4>
                    {subtitle && <h5 className="card-subtitle">{subtitle}</h5>}
                </div>
                {control && <div className="ms-auto">{control}</div>}
            </div>
            <div className="table-responsive">
                <table className="table mb-0 table-hover align-middle text-nowrap">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th
                                    className="border-top-0 text-align-center cursor-pointer"
                                    key={column.key as string}
                                >
                                    <div
                                        onClick={() =>
                                            sortChangeHandler(column)
                                        }
                                    >
                                        {column.title}
                                        {column.showSort && (
                                            <TableSort
                                                sortType={column.sortType}
                                            />
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions && (
                                <th className="border-top-0 text-align-center">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center"
                                >
                                    No matching data 😢
                                </td>
                            </tr>
                        )}
                        {dataSource.map(data => (
                            <tr key={data._id}>
                                {columns.map(column => {
                                    return (
                                        <td
                                            key={column.key as string}
                                            className="text-align-center"
                                        >
                                            <div
                                                style={{
                                                    width: column.width
                                                        ? `${column.width}px`
                                                        : 'auto',
                                                }}
                                            >
                                                {column.render
                                                    ? column.render(
                                                          data[
                                                              column.key as string
                                                          ]
                                                      )
                                                    : data[
                                                          column.key as string
                                                      ]}
                                            </div>
                                        </td>
                                    );
                                })}
                                {actions && (
                                    <td className="text-align-center">
                                        {actions(data)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPagination && (
                <div className="mt-5 d-flex justify-content-end gap-3 align-items-center">
                    <TablePagination
                        pageCount={pagination!.totalPage}
                        currentPage={pagination!.page - 1}
                        onPageChange={onPageChange!}
                        pageLimit={pagination!.limit}
                        onPageLimitChange={onPageLimitChange!}
                    />
                </div>
            )}
        </CardLayout>
    );
};

export default CustomTable;
