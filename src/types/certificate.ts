import { HasId, QueryParms, ResponseData, TimeStamp } from './common';

export enum CertificateStatus {
    INITIAL = 0,
    TESTING = 1,
    SAMPLE = 2,
    ASSESSING = 3,
    COMPLETED = 4,
    FAILURE = 5,
}

export enum InspectStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILURE = 'failure',
}

export interface InspectedFoods extends HasId {
    name: string;
    organization: string;
    status: InspectStatus;
    notes?: string;
    resultDate?: Date;
}

export interface Certificate extends HasId, TimeStamp {
    facility: string;
    facilityName: string;
    provinceCode: number;
    districtCode: number;
    startDate?: Date;
    endDate?: Date;
    isRevoked: boolean;
    status: CertificateStatus;
    inspectedFoods?: InspectedFoods[];
}

export interface CertificateCreate {
    facility: string;
}

export type CertificateFields =
    | 'facilityName'
    | 'status'
    | 'isRevoked'
    | 'startDate'
    | 'endDate'
    | 'createdAt';

export interface CertificateFilter {
    _q: string;
    status: CertificateStatus;
    isRevoked: boolean;
    startDate_gte: string;
    endDate_lte: string;
}

export type CertificateQuery = Partial<
    QueryParms<CertificateFields> & Partial<CertificateFilter>
>;

export type CertificateRecordResponse = ResponseData<Certificate>;

export type CertificateListResponse = ResponseData<Certificate[]>;
