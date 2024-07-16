import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.model";
import {count, switchMap, tap} from "rxjs";

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss'
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private countriesService: CountriesService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.countriesService.searchByCode(id))
    ).subscribe({
      next: (response: Country | null) => {
        if (!response) {
          return this.router.navigateByUrl('');
        }
        this.country = response;
        return;
      }
    })
  }

  protected readonly count = count;
}
