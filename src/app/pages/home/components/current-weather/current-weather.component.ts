 import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input } from '@angular/core';
import { CityWeather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'jv-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  @Input()
  cityWeather: CityWeather;

  get cityName(): string {
    return `${this.cityWeather.city.name} ${this.cityWeather.city.country}`;
  }
}
