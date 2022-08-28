import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Weather from "../../../../_files/Weather.json";

//Added all the API info on service instead of using a plain or js or JSON file, it will
//be an export/import if saving the API info on flat file 
const WEATHER_API_KEY = Weather.weatherAPIRecords.current.key;


@Injectable({
  providedIn: 'root'
})
export class CallApiServiceService {

  constructor(private httpClient: HttpClient) {
    
  }
  

  public getCurrentWeatherResponse(city : string): Observable<any> {
    let endPoints = Weather.weatherAPIRecords.current.API;
    let httpparams = {
      params: new HttpParams()
        .set('key', WEATHER_API_KEY)
        .set('q', city)    
    };
    return this.httpClient.get<any>(endPoints, httpparams);
  }

  public getForecastWeatherResponse(city : string): Observable<any> {
    let endPoints = Weather.weatherAPIRecords.forecast.API;
    let httpparams = {
      params: new HttpParams()
        .set('key', WEATHER_API_KEY)
        .set('q', city)    
    };
    return this.httpClient.get<any>(endPoints, httpparams);
  }

}
