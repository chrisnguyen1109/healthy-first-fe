import { AssessingContentForm } from '@/pages/certificate/components/AssessingContent';
import { SampleContentForm } from '@/pages/certificate/components/SampleContent';
import {
    CertificateRecordResponse,
    CertificateStatus,
    FacilityRecordResponse,
    InspectedFoods,
} from '@/types';
import axiosClient from './axiosClient';

const CERTIFICATE_BASE_URL = '/certificate';

export const updateCertificateTestingStep = (
    id: string
): Promise<CertificateRecordResponse> =>
    axiosClient.patch(
        `${CERTIFICATE_BASE_URL}/${id}/step/${CertificateStatus.TESTING}`
    );

export const updateCertificateSampleStep = (
    id: string,
    body: SampleContentForm
): Promise<CertificateRecordResponse> =>
    axiosClient.patch(
        `${CERTIFICATE_BASE_URL}/${id}/step/${CertificateStatus.SAMPLE}`,
        { ...body }
    );

export const updateCertificateFood = (
    id: string,
    foodId: string,
    body: Pick<InspectedFoods, 'status' | 'notes'>
): Promise<CertificateRecordResponse> =>
    axiosClient.patch(`${CERTIFICATE_BASE_URL}/${id}/inspectedFood/${foodId}`, {
        ...body,
    });

export const updateCertificateAssessingStep = (
    id: string,
    body: AssessingContentForm
): Promise<CertificateRecordResponse> =>
    axiosClient.patch(
        `${CERTIFICATE_BASE_URL}/${id}/step/${CertificateStatus.ASSESSING}`,
        { ...body }
    );

export const updateCertificateCompletedStep = (
    id: string,
    body: { endDate: Date }
): Promise<CertificateRecordResponse> =>
    axiosClient.patch(
        `${CERTIFICATE_BASE_URL}/${id}/step/${CertificateStatus.COMPLETED}`,
        { ...body }
    );

export const updateCertificateFailureStep = (
    id: string
): Promise<CertificateRecordResponse> =>
    axiosClient.patch(
        `${CERTIFICATE_BASE_URL}/${id}/step/${CertificateStatus.FAILURE}`
    );

export const revokeCertificateFacility = (
    id: string
): Promise<FacilityRecordResponse> =>
    axiosClient.patch(`facility/${id}/revoke-certificate`);
