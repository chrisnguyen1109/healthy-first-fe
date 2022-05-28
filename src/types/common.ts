import { ReactNode } from 'react';

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

export interface QueryParms<T extends string> {
    page: number;
    limit: number;
    sort: `${'-' | ''}${T}` | `${'-' | ''}${T}`[];
}

export type CallBack<T = any> = (args?: T) => void;

export type ColumnsType<T extends object = any> = {
    title: string;
    key: keyof T;
    render?: (value: any) => ReactNode;
    width?: number;
}[];
