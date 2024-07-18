import {Component, input, InputSignal, OnDestroy} from '@angular/core';
import {Country} from "../../interfaces/country.model";

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.scss'
})
export class CountryTableComponent implements OnDestroy {
  ngOnDestroy(): void {
    console.log('CountryTableComponent Destroyed');
  }

  public countries: InputSignal<Array<Country>> = input.required();
}
