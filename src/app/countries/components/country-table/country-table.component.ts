import {Component, input, InputSignal} from '@angular/core';
import {Country} from "../../interfaces/country.model";

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.scss'
})
export class CountryTableComponent {
  public countries: InputSignal<Array<Country>> = input.required();
}
