import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.model";

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.scss'
})
export class ByCapitalPageComponent implements OnInit {

  protected countries: Array<Country>;
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {
    this.countries = [];
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  protected searchByCapital(term: string): void {
    this.searchCountriesByCapital(term);
  }

  private searchCountriesByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchByCapital(term).subscribe({
      next: (response: Array<Country>) => {
        this.countries = response;
        this.isLoading = false;
      }
    })
  }
}
