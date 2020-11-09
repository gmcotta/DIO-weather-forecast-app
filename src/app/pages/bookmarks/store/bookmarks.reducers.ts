import { createReducer, Action, on } from '@ngrx/store';

import { Bookmark } from 'src/app/shared/models/bookmark.model';

import * as fromHomeActions from '../../home/store/home.actions';
import * as fromBookmarkActions from './bookmarks.actions';

export interface BookmarksState {
  list: Bookmark[];
};

export const bookmarkInitialState: BookmarksState = {
  list: [],
};

const reducer = createReducer(
  bookmarkInitialState,
  on(fromHomeActions.toggleBookmark, (state, { entity }) => ({
    ...state,
    list: toggleBookmark(state.list, entity),
  })),
  on(fromBookmarkActions.removeBookmark, (state, { id }) => ({
    ...state,
    list: state.list.filter((bookmark: Bookmark) => bookmark.id !== id),
  }))
);

export function bookmarkReducer(
  state: BookmarksState | undefined,
  action: Action
) {
    return reducer(state, action);
  };

function toggleBookmark(list: Bookmark[], entity: Bookmark): Bookmark[] {
  if (!!list.find((bookmark: Bookmark) => bookmark.id === entity.id)) {
    return list.filter((bookmark: Bookmark) => bookmark.id !== entity.id);
  }
  return [...list, entity];
};
