import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromDetailsActions from '../../store/details.actions';
import * as fromDetailsSelectors from '../../store/details.selectors';

import { AppState } from 'src/app/shared/store/app.reducer';
import { Observable } from 'rxjs';
import { CityDailyWeather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'jv-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  details$: Observable<CityDailyWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());
    this.details$ = this.store.pipe(select(
      fromDetailsSelectors.selectDetailsEntity
    ));
    this.loading$ = this.store.pipe(select(
      fromDetailsSelectors.selectDetailsLoading
    ));
    this.error$ = this.store.pipe(select(
      fromDetailsSelectors.selectDetailsError
    ));
  }

}
