import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';

import { BookmarksState } from '../../store/bookmarks.reducers';

import * as fromBookmarksSelectors from '../../store/bookmarks.selectors';
import * as fromBookmarksActions from '../../store/bookmarks.actions';

@Component({
  selector: 'jv-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit, OnDestroy {

  bookmarkList$: Observable<Bookmark[]>;
  searchControlWithAutocomplete: FormControl;
  componentDestroyed$ = new Subject();

  constructor(private store: Store<BookmarksState>) { }

  ngOnInit(): void {
    this.bookmarkList$ = this.store
    .pipe(select(fromBookmarksSelectors.selectBookmarksList));
    this.searchControlWithAutocomplete = new FormControl(undefined);

    this.searchControlWithAutocomplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (value: CityTypeaheadItem) =>
          this.store.dispatch(
            fromBookmarksActions.toggleBookmarkById({
              id: value.geonameid
            })
          )
        },
      );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  removeBookmark(id: number) {
    this.store.dispatch(fromBookmarksActions.removeBookmark({ id }));
  }
}
