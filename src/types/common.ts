export interface HasId {
    _id: string;
}

export interface TimeStamp {
    createdAt: Date;
    updatedAt: Date;
}

export interface Pagination {
    records: number;
    totalRecords: number;
    limit: number;
    page: number;
    totalPage: number;
}

export interface ResponseData<T = any> {
    message: string;
    data?: T extends HasId[]
        ? { records: T; pagination: Pagination }
        : T extends HasId
        ? { record: T }
        : T;
}
