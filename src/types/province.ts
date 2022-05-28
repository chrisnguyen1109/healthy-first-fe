export interface Ward {
    name: string;
    code: string;
    district_code: number;
}

export interface District {
    name: string;
    code: string;
    province_code: number;
    wards: Ward[];
}

export interface Province {
    name: string;
    code: number;
    districts: District[];
}
