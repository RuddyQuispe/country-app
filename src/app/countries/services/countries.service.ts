import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, map, Observable, of, tap} from "rxjs";
import {Country} from "../interfaces/country.model";
import {CacheStoreInterface} from "../interfaces/cache-store.interface";
import {ValidRegion} from "../interfaces/region.type";

@Injectable({providedIn: 'root'})
export class CountriesService {

  private readonly apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStoreInterface = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Array<Country>> {
    return this.httpClient.get<Array<Country>>(url).pipe(
      catchError(err => of(new Array<Country>())),
      delay(2000)
    );
  }

  public searchByCapital = (query: string): Observable<Array<Country>> =>
    this.getCountriesRequest(this.apiUrl + '/capital/' + query)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term: query, countries}),
        tap(() => this.saveToLocalStorage())
      )

  // https://restcountries.com/v3.1/name/{name}?fullText=true
  public searchByCountry = (query: string): Observable<Array<Country>> =>
    this.getCountriesRequest(this.apiUrl + '/name/' + query)
      .pipe(
        tap(countries => this.cacheStore.byCountry = {term: query, countries}),
        tap(() => this.saveToLocalStorage())
      )

  // https://restcountries.com/v3.1/region/{region}
  public searchByRegion = (query: ValidRegion): Observable<Array<Country>> =>
    this.getCountriesRequest(this.apiUrl + '/region/' + query)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: query, countries}),
        tap(() => this.saveToLocalStorage())
      )

  public searchByCode = (code: string): Observable<Country | null> =>
    this.httpClient.get<Array<Country>>(this.apiUrl + '/alpha/' + code)
      .pipe(
        map((countries: Array<Country>): Country | null => countries.length > 0 ? countries[0] : null),
        catchError(err => of(null)));
}
