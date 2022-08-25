export interface WeatherAPIResponse {
    town: string;
    state: string;
    nation: string;
    latitude: string;
    longitude: string;
    "Time Zone": string;
    Time: string;
}

export interface WeatherAPIResponse {
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

export interface WeatherAPIResponse {
    forecast: Forecast;
}

export interface Forecast {
    forecastday: Forecastday[];
}

export interface Forecastday {
    astro: Astro;
}

export interface Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
}

export interface WeatherAPIResponse {
    Dawn: string;
    Dusk: string;
    "moon lit": string;
    "moon sleep": string;
    orientation: string;
    Illumination: string;
}
