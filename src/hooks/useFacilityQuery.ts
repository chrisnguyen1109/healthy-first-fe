import { QUERY_FACILITY } from '@/config';
import {
    Facility,
    FacilityCreate,
    FacilityListResponse,
    FacilityQuery,
    FacilityRecordResponse,
} from '@/types';
import initialCustomQuery, { Feature } from './useCustomQuery';

class FacilityQueryClass implements Feature {
    constructor(
        public readonly queryKey: string,
        public readonly service: string
    ) {}
}

const facilityInstance = new FacilityQueryClass(QUERY_FACILITY, 'facility');

export const {
    useItem: useFacility,
    useList: useFacilities,
    useCreateItem: useCreateFacility,
    useUpdateItem: useUpdateFacility,
    useDeleteItem: useDeleteFacility,
} = initialCustomQuery<
    Facility,
    FacilityRecordResponse,
    FacilityListResponse,
    FacilityQuery,
    FacilityCreate
>(facilityInstance);
