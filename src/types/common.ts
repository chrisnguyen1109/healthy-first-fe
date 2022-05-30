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
    _page: number;
    _limit: number;
    _sort:
        | `${'-' | ''}${T}`
        | `${'-' | ''}${keyof TimeStamp}`
        | `${'-' | ''}${T}`[];
}

export type CallBack<T = any> = (args?: T) => void;

export enum SortType {
    ASC = 'asc',
    DESC = 'desc',
}

interface ColumnsTypeInitial<T extends object = any> {
    title: string;
    key: keyof T;
    render?: (value: any) => ReactNode;
    width?: number;
}

interface ColumnsTypeWithoutSort<T extends object = any>
    extends ColumnsTypeInitial<T> {
    showSort?: false;
    sortType?: never;
}

interface ColumnsTypeWithSort<T extends object = any>
    extends ColumnsTypeInitial<T> {
    showSort: true;
    sortType: SortType | null;
}

export type ColumnsType<T extends object = any> =
    | ColumnsTypeWithoutSort<T>
    | ColumnsTypeWithSort<T>;

export interface UpdateProps<X> {
    id: string;
    body: Partial<X>;
}

export interface SortChangeProps {
    field: string | number | symbol;
    sortType: SortType | null;
}

export interface FormOptions {
    value: string | number;
    key: string;
}

export enum FormType {
    CREATE = 'create',
    EDIT = 'edit',
}
