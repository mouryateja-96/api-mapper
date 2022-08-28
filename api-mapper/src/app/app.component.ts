import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CallApiServiceService } from '../app/services/call-api-service.service';
import { WeatherAPIResponse } from './models/weatherAPIResponse';
import Weather from "../../../_files/Weather.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'api-mapper';
  form: FormGroup;
  createLoading = false;

  weatherResponse = {} as WeatherAPIResponse;
  weatherResponseTobeShown = {} as any;

  constructor(private formBuilder: FormBuilder, private callApiServiceService: CallApiServiceService) {
    this.form = this.formBuilder.group({
      apiSelect: ['', Validators.required],
      cityName: ['', Validators.required],
    });

  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  clickSubmit(): void {
    if (this.form.valid) {
      this.weatherResponse = {} as WeatherAPIResponse;
      this.weatherResponseTobeShown = {} as WeatherAPIResponse;
      console.log('Button ok clicked!');
      this.getWeatherResponse();
    }
  }

  getWeatherResponse(): void {
    this.createLoading = true;
    if (this.form.controls['apiSelect'].value == "Current") {
      this.callApiServiceService.getCurrentWeatherResponse(this.form.controls['cityName'].value).subscribe({
        next: (data) => {
          this.createLoading = false;
          console.log(data);
          this.weatherResponse = data;
          console.log(this.weatherResponse);
          let name = Weather.weatherAPIRecords.current.name,
            region = Weather.weatherAPIRecords.current.region,
            country = Weather.weatherAPIRecords.current.country,
            lat = Weather.weatherAPIRecords.current.lat,
            lon = Weather.weatherAPIRecords.current.lon,
            tz_id = Weather.weatherAPIRecords.current.tz_id,
            localtime = Weather.weatherAPIRecords.current.localtime;
          this.weatherResponseTobeShown = {
            [name]: this.weatherResponse.location.name,
            [region]: this.weatherResponse.location.region,
            [country]: this.weatherResponse.location.country,
            [lat]: this.weatherResponse.location.lat,
            [lon]: this.weatherResponse.location.lon,
            [tz_id]: this.weatherResponse.location.tz_id,
            [localtime]: this.weatherResponse.location.localtime,
          };
          this.weatherResponseTobeShown.town = this.weatherResponse.location.name;
          this.weatherResponseTobeShown.state = this.weatherResponse.location.region;
          this.weatherResponseTobeShown.nation = this.weatherResponse.location.country;
          this.weatherResponseTobeShown.latitude = this.weatherResponse.location.lat;
          this.weatherResponseTobeShown.longitude = this.weatherResponse.location.lon;
          this.weatherResponseTobeShown['Time Zone'] = this.weatherResponse.location.tz_id;
          this.weatherResponseTobeShown.Time = this.weatherResponse.location.localtime;
          console.log(this.weatherResponseTobeShown);
        },
        error: (error) => {
          this.createLoading = false;
          console.log(error);
        }
      });
    }
    else if (this.form.controls['apiSelect'].value == "Forecast") {
      this.callApiServiceService.getForecastWeatherResponse(this.form.controls['cityName'].value).subscribe({
        next: (data) => {
          this.createLoading = false;
          console.log(data);
          this.weatherResponse = data;
          console.log(this.weatherResponse);
          let sunrise = Weather.weatherAPIRecords.forecast.sunrise,
            sunset = Weather.weatherAPIRecords.forecast.sunset,
            moonrise = Weather.weatherAPIRecords.forecast.moonrise,
            moonset = Weather.weatherAPIRecords.forecast.moonset,
            moon_phase = Weather.weatherAPIRecords.forecast.moon_phase,
            moon_illumination = Weather.weatherAPIRecords.forecast.moon_illumination;
          this.weatherResponseTobeShown = {
            [sunrise]: this.weatherResponse.forecast.forecastday[0].astro.sunrise,
            [sunset]: this.weatherResponse.forecast.forecastday[0].astro.sunset,
            [moonrise]: this.weatherResponse.forecast.forecastday[0].astro.moonrise,
            [moonset]: this.weatherResponse.forecast.forecastday[0].astro.moonset,
            [moon_phase]: this.weatherResponse.forecast.forecastday[0].astro.moon_phase,
            [moon_illumination]: this.weatherResponse.forecast.forecastday[0].astro.moon_illumination,
          };
          console.log(this.weatherResponseTobeShown);
        },
        error: (error) => {
          this.createLoading = false;
          console.log(error);
        }
      });
    }

  }

  apiSelectChange(): void {
    if ((this.form.controls['apiSelect'].value == 'Canada') || (this.form.controls['apiSelect'].value == 'Both')) {
      this.form.addControl('frenchText', new FormControl('', Validators.required));
    }
    else if (this.form.controls['apiSelect'].value == 'USA') {
      this.form.removeControl('frenchText');
    }
  }
}
