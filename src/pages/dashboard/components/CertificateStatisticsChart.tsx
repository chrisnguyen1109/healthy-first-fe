import CardLayout from '@/components/CardLayout';
import dayjs from 'dayjs';
import { memo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface CertificateStatisticsChartProps {
    data: any;
}

const CertificateStatisticsChart: React.FC<CertificateStatisticsChartProps> = ({
    data,
}) => {
    return (
        <CardLayout>
            <div>
                <h4 className="card-title">Certificate Statistics</h4>
                <h6 className="card-subtitle">
                    Completed certificates and Failed certificates in{' '}
                    {dayjs().year()}
                </h6>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#82ca9d" />
                        <Bar dataKey="failed" fill="#ed596b" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardLayout>
    );
};

export default memo(CertificateStatisticsChart);
