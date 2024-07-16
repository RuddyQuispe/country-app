import {Component} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.model";

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.scss'
})
export class ByCapitalPageComponent {

  protected countries: Array<Country>;

  constructor(private countriesService: CountriesService) {
    this.countries = [];
  }

  protected searchByCapital(term: string): void {
    this.searchCountriesByCapital(term);
  }

  private searchCountriesByCapital(term: string): void {
    this.countriesService.searchByCapital(term).subscribe({
      next: (response: Array<Country>) => {
        this.countries = response;
      }
    })
  }
}
