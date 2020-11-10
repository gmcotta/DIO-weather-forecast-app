import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Params } from '@angular/router';

import * as fromDetailsActions from './details.actions';
import * as fromRouterSelectors from '../../../shared/store/router/router.selectors';

import { WeatherService } from 'src/app/shared/services/weather.service';
import { AppState } from 'src/app/shared/store/app.reducer';
import { combineLatest } from 'rxjs';

@Injectable()
export class DetailsEffects {
  loadCurrentWeather$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromDetailsActions.loadWeatherDetails),
      withLatestFrom(this.store
        .pipe(select(fromRouterSelectors.selectRouterQueryParams))
      ),
      mergeMap(([, queryParams]: [any, Params]) => combineLatest([
        this.weatherService.getCityWeatherByCoord(queryParams.lat, queryParams.lon),
        this.weatherService.getWeatherDetails(queryParams.lat, queryParams.lon)
      ])),
      catchError((err, caught$) => {
        this.store.dispatch(fromDetailsActions.loadWeatherDetailsFailure());
        return caught$;
      }),
      map(([current, daily]) => {
        const entity = daily;
        entity.city = {...entity.city, timeZone: daily.city.timeZone};
        return fromDetailsActions.loadWeatherDetailsSuccess({ entity });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private weatherService: WeatherService,
  ) {}
}
