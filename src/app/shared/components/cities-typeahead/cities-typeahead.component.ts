import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Subscriber } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { CityTypeaheadItem } from '../../models/city-typeahead-item.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'jv-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss']
})
export class CitiesTypeaheadComponent implements OnInit {

  search: string;
  dataSource$: Observable<CityTypeaheadItem[]>;

  suggestions$: Observable<any>;
  errorMessage: string;

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.dataSource$ = new Observable(
      (subscriber: Subscriber<string>) => subscriber.next(this.search),
    ).pipe(
      switchMap((query: string) => this.citiesService.getCities(query))
      )
  }

  onSelected(match: TypeaheadMatch) {
    console.log(match.value);
  }

}
