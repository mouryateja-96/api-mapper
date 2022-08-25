import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CallApiServiceService } from '../app/services/call-api-service.service';
import { WeatherAPIResponse } from '../app/models/currentAPIResponse';
import { ForecastAPIResponse } from './models/forecastAPIResonse';

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
  weatherResponseTobeShown = {} as WeatherAPIResponse;

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
    else if(this.form.controls['apiSelect'].value == "Forecast") {
      this.callApiServiceService.getForecastWeatherResponse(this.form.controls['cityName'].value).subscribe({
        next: (data) => {
          this.createLoading = false;
          console.log(data);
          this.weatherResponse = data;
          console.log(this.weatherResponse);
          this.weatherResponseTobeShown.Dawn = this.weatherResponse.forecast.forecastday[0].astro.sunrise;
          this.weatherResponseTobeShown.Dusk = this.weatherResponse.forecast.forecastday[0].astro.sunset;
          this.weatherResponseTobeShown['moon lit'] = this.weatherResponse.forecast.forecastday[0].astro.moonrise;
          this.weatherResponseTobeShown['moon sleep'] = this.weatherResponse.forecast.forecastday[0].astro.moonset;
          this.weatherResponseTobeShown.orientation = this.weatherResponse.forecast.forecastday[0].astro.moon_phase;
          this.weatherResponseTobeShown.Illumination= this.weatherResponse.forecast.forecastday[0].astro.moon_illumination;
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
