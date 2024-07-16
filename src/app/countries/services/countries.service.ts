import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Country} from "../interfaces/country.model";

@Injectable({providedIn: 'root'})
export class CountriesService {

  private readonly apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {
  }

  public searchByCapital = (query: string): Observable<Array<Country>> =>
    this.httpClient.get<Array<Country>>(this.apiUrl + '/capital/' + query)
      .pipe(
        catchError(err => of(new Array<Country>())))

  // https://restcountries.com/v3.1/name/{name}?fullText=true
  public searchByCountry = (query: string): Observable<Array<Country>> =>
    this.httpClient.get<Array<Country>>(this.apiUrl + '/name/' + query)
      .pipe(catchError(err => of(new Array<Country>())));

  // https://restcountries.com/v3.1/region/{region}
  public searchByRegion = (query: string): Observable<Array<Country>> =>
    this.httpClient.get<Array<Country>>(this.apiUrl + '/region/' + query)
      .pipe(catchError(err => of(new Array<Country>())));

  public searchByCode = (code: string): Observable<Country | null> =>
    this.httpClient.get<Array<Country>>(this.apiUrl + '/alpha/' + code)
      .pipe(
        map((countries: Array<Country>): Country | null => countries.length > 0 ? countries[0] : null),
        catchError(err => of(null)));
}
