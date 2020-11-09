import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPage } from './containers/details/details.page';
import { RouterModule } from '@angular/router';
import { DetailsGuardService } from './services/details.guard.service';



@NgModule({
  declarations: [DetailsPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailsPage,
        canActivate: [DetailsGuardService],
      },
    ]),
  ],
  providers: [
    DetailsGuardService,
  ],
})
export class DetailsModule { }
