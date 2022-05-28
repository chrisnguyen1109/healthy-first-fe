import { ColumnsType, HasId } from '@/types';
import { ReactNode } from 'react';
import CardLayout from './CardLayout';

interface DataType extends HasId {
    [key: string]: any;
}

interface CustomTableProps {
    title: string;
    subtitle?: ReactNode;
    control?: ReactNode;
    columns: ColumnsType;
    dataSource: DataType[];
    actions?: (data: any) => ReactNode;
    isLoading?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
    title,
    subtitle,
    control,
    columns,
    dataSource,
    actions,
    isLoading,
}) => {
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
                                    className="border-top-0 text-align-center"
                                    key={column.key as string}
                                >
                                    {column.title}
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
                        {dataSource.map(data => (
                            <tr key={data._id}>
                                {columns.map(column => {
                                    return (
                                        <td
                                            key={column.key as string}
                                            style={{
                                                width: column.width
                                                    ? `${column.width}px`
                                                    : 'auto',
                                            }}
                                            className="text-align-center"
                                        >
                                            {column.render
                                                ? column.render(
                                                      data[column.key as string]
                                                  )
                                                : data[column.key as string]}
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
        </CardLayout>
    );
};

export default CustomTable;
