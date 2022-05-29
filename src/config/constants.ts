import { Pagination } from '@/types';

export const API_URL = process.env.REACT_APP_API_URL;

export const QUERY_AUTH = 'query_auth';

export const QUERY_USER = 'query_user';

export const QUERY_FACILITY = 'query_facility';

export const QUERY_PROVINCE = 'query_province';

export const QUERY_WARD = 'query_ward';

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
