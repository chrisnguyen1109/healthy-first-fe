import {
    BusinessType,
    CertificateStatus,
    FacilityCertificate,
    InspectStatus,
    Pagination,
    UserRole,
} from '@/types';
import { capitalizeWord } from '@/utils';

export const API_URL = process.env.REACT_APP_API_URL;

export const QUERY_AUTH = 'query_auth';

export const QUERY_USER = 'query_user';

export const QUERY_FACILITY = 'query_facility';

export const QUERY_PROVINCE = 'query_province';

export const QUERY_WARD = 'query_ward';

export const QUERY_CERTIFICATE = 'query_certificate';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 5;

export const DEFAULT_PAGINATION: Pagination = {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    totalPage: 1,
    records: 0,
    totalRecords: 0,
};

export const DEFAULT_FILTER = {
    _page: DEFAULT_PAGE,
    _limit: DEFAULT_LIMIT,
};

export const PAGE_LIMIT_OPTIONS = [DEFAULT_LIMIT, 10, 20];

export const BUSINESS_TYPE_OPTIONS = Object.values(BusinessType).map(el => ({
    key: capitalizeWord(el),
    value: el,
}));

export const FACILITY_CERTIFICATE_OPTIONS = Object.values(
    FacilityCertificate
).map(el => ({
    key: capitalizeWord(el),
    value: el,
}));

export const USER_ROLE_OPTIONS = Object.values(UserRole).map(el => ({
    key: capitalizeWord(el),
    value: el,
}));

export const USER_STATUS_OPTIONS = [
    {
        key: 'Active',
        value: 'true',
    },
    {
        key: 'Inactive',
        value: 'false',
    },
];

export const FOOD_STATUS_OPTIONS = Object.values(InspectStatus).map(el => ({
    key: capitalizeWord(el),
    value: el,
}));

export const CERTIFICATE_STATUS = [
    {
        key: 'Initial',
        value: CertificateStatus.INITIAL,
    },
    {
        key: 'Testing',
        value: CertificateStatus.TESTING,
    },
    {
        key: 'Sample',
        value: CertificateStatus.SAMPLE,
    },
    {
        key: 'Assessing',
        value: CertificateStatus.ASSESSING,
    },
    {
        key: 'Completed',
        value: CertificateStatus.COMPLETED,
    },
    {
        key: 'Failure',
        value: CertificateStatus.FAILURE,
    },
];

export const CERTIFICATE_REVOKE_OPTIONS = [
    {
        key: 'Revoked',
        value: 'true',
    },
    {
        key: 'No Revoked',
        value: 'false',
    },
];

export const PHONE_REG_EXP =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
