import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromDetailsActions from '../../store/details.actions';
import { AppState } from 'src/app/shared/store/app.reducer';

@Component({
  selector: 'jv-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());
  }

}
