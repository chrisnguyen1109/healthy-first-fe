import CardLayout from '@/components/CardLayout';
import dayjs from 'dayjs';
import { memo } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface FacilityCertificateStatisticsChartProps {
    data: any;
}

const FacilityCertificateStatisticsChart: React.FC<
    FacilityCertificateStatisticsChartProps
> = ({ data }) => {
    return (
        <CardLayout>
            <div className="d-md-flex align-items-center">
                <div>
                    <h4 className="card-title">
                        Certified Facilities Statistics
                    </h4>
                    <h6 className="card-subtitle">
                        Certified facilities and Uncertified facilities in{' '}
                        {dayjs().year()}
                    </h6>
                </div>
                <div className="ms-auto d-flex no-block align-items-center">
                    <ul className="list-inline dl d-flex align-items-center m-r-15 m-b-0 gap-3">
                        <li className="list-inline-item d-flex align-items-center text-success">
                            <i className="fa fa-circle font-10 me-1"></i>
                            Certified
                        </li>
                        <li className="list-inline-item d-flex align-items-center text-danger">
                            <i className="fa fa-circle font-10 me-1"></i>
                            Uncertified
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-3 d-flex flex-column gap-5">
                <div>
                    <h5 className="mb-3">Certified facilites</h5>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} syncId="certificateId">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="certified"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h5 className="mb-3">Uncertified facilites</h5>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} syncId="certificateId">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="uncertified"
                                stroke="#ed596b"
                                fill="#ed596b"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </CardLayout>
    );
};

export default memo(FacilityCertificateStatisticsChart);
