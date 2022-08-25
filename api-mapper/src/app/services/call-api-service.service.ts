import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

//Added all the API info on service instead of using a plain or js or JSON file, it will
//be an export/import if saving the API info on flat file 
const WEATHER_API = environment.weatherAPI;
const WEATHER_API_KEY = environment.weatherAPIKey;


@Injectable({
  providedIn: 'root'
})
export class CallApiServiceService {

  apiURL: string;
  constructor(private httpClient: HttpClient) {
    this.apiURL = WEATHER_API;
  }
  

  public getCurrentWeatherResponse(city : string): Observable<any> {
    let endPoints = '/current.json';
    let httpparams = {
      params: new HttpParams()
        .set('key', WEATHER_API_KEY)
        .set('q', city)    
    };
    return this.httpClient.get<any>(this.apiURL + endPoints, httpparams);
  }

  public getForecastWeatherResponse(city : string): Observable<any> {
    let endPoints = '/forecast.json';
    let httpparams = {
      params: new HttpParams()
        .set('key', WEATHER_API_KEY)
        .set('q', city)    
    };
    return this.httpClient.get<any>(this.apiURL + endPoints, httpparams);
  }

}
