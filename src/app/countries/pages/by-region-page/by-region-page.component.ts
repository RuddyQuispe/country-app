import {Component, OnInit} from '@angular/core';
import {Country} from "../../interfaces/country.model";
import {CountriesService} from "../../services/countries.service";
import {ValidRegion} from "../../interfaces/region.type";

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.scss'
})
export class ByRegionPageComponent implements OnInit {

  protected countries: Array<Country>;
  protected regions: Array<ValidRegion> = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: ValidRegion;

  constructor(private countriesService: CountriesService) {
    this.countries = [];
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  protected searchCountriesByRegion(term: ValidRegion): void {
    this.selectedRegion = term;
    this.searchByRegion(term);
  }

  private searchByRegion(query: ValidRegion): void {
    this.countriesService.searchByRegion(query).subscribe({
      next: (response: Array<Country>) =>
        this.countries = response
    });
  }
}
