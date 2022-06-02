import CardLayout from '@/components/CardLayout';
import dayjs from 'dayjs';
import { memo } from 'react';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

interface FacilityStatisticsChartProps {
    data: any;
}

const FacilityStatisticsChart: React.FC<FacilityStatisticsChartProps> = ({
    data,
}) => {
    return (
        <CardLayout>
            <div>
                <h4 className="card-title">Monthly Stats</h4>
                <h6 className="card-subtitle">
                    Certification status of facilities in{' '}
                    {dayjs().format('MMMM')}
                </h6>

                <ResponsiveContainer width="100%" height={400}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="status" />
                        <PolarRadiusAxis />
                        <Tooltip />
                        <Radar
                            dataKey="facilities"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </CardLayout>
    );
};

export default memo(FacilityStatisticsChart);
