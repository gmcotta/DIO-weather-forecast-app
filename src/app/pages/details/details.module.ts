import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPage } from './containers/details/details.page';
import { RouterModule } from '@angular/router';
import { DetailsGuardService } from './services/details.guard.service';
import { StoreModule } from '@ngrx/store';
import { detailsReducer } from './store/details.reducers';
import { EffectsModule } from '@ngrx/effects';
import { DetailsEffects } from './store/details.effects';



@NgModule({
  declarations: [
    DetailsPage,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailsPage,
        canActivate: [DetailsGuardService],
      },
    ]),
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
  ],
  providers: [
    DetailsGuardService,
  ],
})
export class DetailsModule { }
