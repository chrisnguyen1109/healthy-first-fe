import { BusinessType } from '@/types';

export const renderFacilityType = (businessType: BusinessType) => {
    switch (businessType) {
        case BusinessType.FOOD_PRODUCTION: {
            return <label className="badge bg-info">{businessType}</label>;
        }
        case BusinessType.FOOD_SERVICE: {
            return <label className="badge bg-purple">{businessType}</label>;
        }
        default: {
            return <label className="badge bg-danger">Unknow</label>;
        }
    }
};
