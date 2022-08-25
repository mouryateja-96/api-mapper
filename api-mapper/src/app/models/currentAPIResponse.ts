export interface CurrentAPIResponse {
    town: string;
    state: string;
    nation: string;
    latitude: string;
    longitude: string;
    "Time Zone": string;
    Time: string;
}

export interface CurrentAPIResponse {
    location : Location;
}
export interface Location {
    name: string;
    region: string;
    country: string;
    lat: string;
    lon: string;
    tz_id: string;
    localtime: string;
}

