import { createAction, props } from '@ngrx/store';

import { Bookmark } from 'src/app/shared/models/bookmark.model';

export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',
  props<{ query: string }>(),
);

export const loadCurrentWeatherSuccess = createAction(
  '[Weather API] Load Current Weather Success',
  props<{ entity: any }>(),
);

export const loadCurrentWeatherFailure = createAction(
  '[Weather API] Load Current Weather Failure'
);


export const toggleBookmark = createAction(
  '[Home] Toggle Bookmark',
  props<{ entity: Bookmark }>(),
)
