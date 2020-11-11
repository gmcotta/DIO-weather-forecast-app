import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { BookmarksPage } from './containers/bookmarks/bookmarks.page';
import { bookmarkReducer } from './store/bookmarks.reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { BookmarksEffects } from './store/bookmarks.effects';

@NgModule({
  declarations: [BookmarksPage],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('bookmarks', bookmarkReducer),
    EffectsModule.forFeature([BookmarksEffects]),
  ],
})
export class BookmarksModule { }
