import { createAction, props } from '@ngrx/store';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<{ id: number }>(),
);

export const toggleBookmarkById = createAction(
  '[Bookmark] Toggle Bookmark By Id',
  props<{ id: number }>(),
);

export const updateBookmarkList = createAction(
  '[Bookmark] Update Bookmark List',
  props<{ bookmarkList: Bookmark[] }>(),
);
