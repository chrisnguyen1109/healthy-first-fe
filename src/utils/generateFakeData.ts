import { MONTHS } from '@/config';
import { FacilityCertificate } from '@/types';

const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

export const generateFakeCertifiedFacilities = () =>
    MONTHS.map(month => ({
        month,
        certified: randomNumber(1000, 4000),
        uncertified: randomNumber(500, 2000),
    }));

export const generateFakeCertificateResults = () =>
    MONTHS.map(month => ({
        month: month.slice(0, 3),
        completed: randomNumber(1000, 4000),
        failed: randomNumber(500, 2000),
    }));

export const generateFakeFacilityStatus = () =>
    Object.values(FacilityCertificate).map(status => ({
        status,
        facilities: randomNumber(50, 200),
    }));
