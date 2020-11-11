import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { convertToLocalTime } from 'date-fns-timezone';
import fromUnixTime from 'date-fns/fromUnixTime';
import ptBR from 'date-fns/locale/pt-BR';
import { Units } from 'src/app/shared/models/units.enum';

import { DailyWeather, Weather } from 'src/app/shared/models/weather.model';
import { unitToSymbol } from 'src/app/shared/utils/units.utils';

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
  @Input()
  unit: Units;

  get weather(): Weather {
    return this.dailyWeather.weather;
  };

  get date(): string {
    return format(fromUnixTime(this.dailyWeather.date), "dd MMM - EEEE", {
      locale: ptBR,
    });
  };

  get icon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  };

  get unitSymbol(): string {
    return unitToSymbol(this.unit);
  };

  unixToHourMinute(unixValue: number): string {
    const timeConverted = convertToLocalTime(fromUnixTime(unixValue), {
      timeZone: this.timeZone
    });
    return format(timeConverted, "HH:mm");
  };
}
