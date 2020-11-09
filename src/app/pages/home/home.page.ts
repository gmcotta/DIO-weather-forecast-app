import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CityWeather } from 'src/app/shared/models/weather.model';

import * as fromHomeActions from './store/home.actions';
import * as fromHomeSelectors from './store/home.selectors';

@Component({
  selector: 'jv-home',
  templateUrl: './containers/home/home.page.html',
  styleUrls: ['./containers/home/home.page.scss']
})
export class HomePage implements OnInit {
  searchControl: FormControl;
  text: string;
  cityWeather$: Observable<CityWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required);
    this.cityWeather$ = this.store
      .pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.loading$ = this.store
      .pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store
      .pipe(select(fromHomeSelectors.selectCurrentWeatherError));
  }

  doSearch(): void {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }
}
