import {Component, OnInit} from '@angular/core';
import {Country} from "../../interfaces/country.model";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.scss'
})
export class ByCountryPageComponent implements OnInit {
  protected countries: Array<Country> = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  private searchByCountry(query: string): void {
    this.countriesService.searchByCountry(query).subscribe({
      next: (response: Array<Country>) =>
        this.countries = response
    });
  }

  protected searchCountriesByCountry(event: string): void {
    this.searchByCountry(event);
  }
}
