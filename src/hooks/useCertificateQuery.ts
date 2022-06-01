import { QUERY_CERTIFICATE } from '@/config';
import {
    Certificate,
    CertificateCreate,
    CertificateListResponse,
    CertificateQuery,
    CertificateRecordResponse,
} from '@/types';
import initialCustomQuery, { Feature } from './useCustomQuery';

class CertificateQueryClass implements Feature {
    constructor(
        public readonly queryKey: string,
        public readonly service: string
    ) {}
}

const certificateInstance = new CertificateQueryClass(
    QUERY_CERTIFICATE,
    'certificate'
);

export const {
    useItem: useCertificate,
    useList: useCertificates,
    useCreateItem: useCreateCertificate,
} = initialCustomQuery<
    Certificate,
    CertificateRecordResponse,
    CertificateListResponse,
    CertificateQuery,
    CertificateCreate
>(certificateInstance);
