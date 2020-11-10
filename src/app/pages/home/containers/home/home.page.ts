import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import {  map, takeUntil } from 'rxjs/operators';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';

import * as fromHomeActions from '../../store/home.actions';
import * as fromHomeSelectors from '../../store/home.selectors';
import * as fromBookmarkSelectors from '../../../bookmarks/store/bookmarks.selectors';
import { bookmarkReducer } from 'src/app/pages/bookmarks/store/bookmarks.reducers';

@Component({
  selector: 'jv-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  searchControl: FormControl;
  searchControlWithAutocomplete: FormControl;
  cityWeather: CityWeather;
  cityWeather$: Observable<CityWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  bookmarkList$: Observable<Bookmark[]>;
  isFavorite$: Observable<boolean>;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required);
    this.searchControlWithAutocomplete = new FormControl(undefined);
    this.searchControlWithAutocomplete.valueChanges.subscribe({
      next: value => console.log(value)
    });

    this.cityWeather$ = this.store
      .pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({ next: (value: CityWeather) => this.cityWeather = value });
    this.loading$ = this.store
      .pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store
      .pipe(select(fromHomeSelectors.selectCurrentWeatherError));
    this.bookmarkList$ = this.store
      .pipe(select(fromBookmarkSelectors.selectBookmarksList));
    this.isFavorite$ = combineLatest([this.cityWeather$, this.bookmarkList$])
      .pipe(
        map(([current, bookmarkList]) => {
          if (!!current) {
            return bookmarkList.some(
              (bookmark: Bookmark) => bookmark.id === current.city.id
            );
          }
          return false;
        })
      )
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  doSearch(): void {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }

  onToggleBookmark() {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: bookmark }));
  }
}
