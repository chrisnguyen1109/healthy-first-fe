import { HasId, QueryParms, ResponseData, TimeStamp } from './common';

export enum BusinessType {
    FOOD_PRODUCTION = 'food_production',
    FOOD_SERVICE = 'food_service',
}

export interface Facility extends HasId, TimeStamp {
    name: string;
    address: string;
    owner: string;
    provinceCode: number;
    provinceName: string;
    districtCode: number;
    districtName: string;
    wardCode: number;
    wardName: string;
    phoneNumber: string;
    businessType: BusinessType;
    description?: string;
}

export interface FacilityCreate {
    name: string;
    address: string;
    owner: string;
    provinceCode: number;
    districtCode: number;
    wardCode: number;
    phoneNumber: string;
    businessType: BusinessType;
    description?: string;
}

export type FacilityFields =
    | 'name'
    | 'owner'
    | 'phoneNumber'
    | 'businessType'
    | 'provinceName'
    | 'districtName'
    | 'wardName';

export interface FacilityFilter {
    _q: string;
    businessType: BusinessType;
    provinceCode: number;
    districtCode: number;
    wardCode: number;
}

export type FacilityQuery = Partial<
    QueryParms<FacilityFields> & Partial<FacilityFilter>
>;

export type FacilityRecordResponse = ResponseData<Facility>;

export type FacilityListResponse = ResponseData<Facility[]>;
