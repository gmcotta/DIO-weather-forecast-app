import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import ptBR from 'date-fns/locale/pt-BR';

import { DailyWeather, Weather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'jv-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent {

  @Input()
  dailyWeather: DailyWeather;
  @Input()
  timeZone: string;

  get weather(): Weather {
    return this.dailyWeather.weather;
  }

  get date(): string {
    return format(fromUnixTime(this.dailyWeather.date), "dd MMM - EEEE", {
      locale: ptBR,
    });
  }

  get icon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  }

  unixToHourMinute(unixValue: number): string {
    return format(fromUnixTime(unixValue), "HH:mm");
  }
}
