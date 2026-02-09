export interface Address {
    id?: number;
    pincode: number;
    landmark: string;
    building_no: string;
}

export interface Employee {
    id: number;
    name: string;
    a: Address; // This links to the address object
}