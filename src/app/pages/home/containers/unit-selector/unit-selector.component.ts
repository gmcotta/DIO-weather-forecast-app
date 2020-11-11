import { Component, OnInit } from '@angular/core';
import { Units } from 'src/app/shared/models/units.enum';

@Component({
  selector: 'jv-unit-selector',
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.scss']
})
export class UnitSelectorComponent implements OnInit {

  unit: Units;
  unitsEnum = Units;

  constructor() { }

  ngOnInit(): void {
  }

  updateUnit(unit: Units) {

  }
}
