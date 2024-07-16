import {Component} from '@angular/core';
import {Country} from "../../interfaces/country.model";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.scss'
})
export class ByRegionPageComponent {

  protected countries: Array<Country>;

  constructor(private countriesService: CountriesService) {
    this.countries = [];
  }

  protected searchCountriesByRegion(term: string): void {
    this.searchByRegion(term);
  }

  private searchByRegion(query: string): void {
    this.countriesService.searchByRegion(query).subscribe({
      next: (response: Array<Country>) =>
        this.countries = response
    });
  }
}
