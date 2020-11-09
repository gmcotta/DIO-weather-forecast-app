import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { BookmarksState } from '../../store/bookmarks.reducers';

import * as fromBookmarksSelectors from '../../store/bookmarks.selectors';
import * as fromBookmarksActions from '../../store/bookmarks.actions';

@Component({
  selector: 'jv-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})
export class BookmarksPage implements OnInit {

  bookmarkList$: Observable<Bookmark[]>;

  constructor(private store: Store<BookmarksState>) { }

  ngOnInit(): void {
    this.bookmarkList$ = this.store
      .pipe(select(fromBookmarksSelectors.selectBookmarksList));
  }

  removeBookmark(id: number) {
    this.store.dispatch(fromBookmarksActions.removeBookmark({ id }));
  }
}
