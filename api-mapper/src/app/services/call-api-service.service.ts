import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const WEATHER_API = environment.weatherAPI;
// Might have to use below constants in future
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

}
