import {
    generateFakeCertificateResults,
    generateFakeCertifiedFacilities,
    generateFakeFacilityStatus,
} from '@/utils';
import { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import CertificateStatisticsChart from './components/CertificateStatisticsChart';
import FacilityCertificateStatisticsChart from './components/FacilityCertificateStatisticsChart';
import FacilityStatisticsChart from './components/FacilityStatisticsChart';

const Dashboard: React.FC = () => {
    const fakeCertifiedFacilities = useMemo(
        generateFakeCertifiedFacilities,
        []
    );

    const fakeFacilityStatus = useMemo(generateFakeFacilityStatus, []);

    const fakeCertificateResults = useMemo(generateFakeCertificateResults, []);

    return (
        <Row>
            <Col xs={12}>
                <FacilityCertificateStatisticsChart
                    data={fakeCertifiedFacilities}
                />
            </Col>
            <Col xs={12} md={6}>
                <FacilityStatisticsChart data={fakeFacilityStatus} />
            </Col>
            <Col xs={12} md={6}>
                <CertificateStatisticsChart data={fakeCertificateResults} />
            </Col>
        </Row>
    );
};

export default Dashboard;
