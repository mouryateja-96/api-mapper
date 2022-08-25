export interface ForecastAPIResponse {
    Dawn: string;
    Dusk: string;
    "moon lit": string;
    "moon sleep": string;
    orientation: string;
    Illumination: string;
}

export interface ForecastAPIResponse {
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

