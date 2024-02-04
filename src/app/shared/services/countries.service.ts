import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { CountryBorders, SmallCountry } from '../interfaces/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _baseUrl: string = 'https://restcountries.com/v3.1';
  private _regions: string[] = ['Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania'];

  constructor(private http: HttpClient) { }
  
  get regions() {
    return [ ...this._regions]
  }
  
  getCountriesByRegion( region: string): Observable<SmallCountry[]>{
    return this.http.get<SmallCountry[]>(`${this._baseUrl}/region/${region}?fields=name,cca3`)
  }

  getCountryBorders( code: string): Observable<CountryBorders | null>{
    if (!code) {
      return of(null)
    }
    return this.http.get<CountryBorders>(`${this._baseUrl}/alpha/${code}?fields=borders`)
  }

  getCountryByCode( code: string): Observable<SmallCountry>{
    return this.http.get<SmallCountry>(`${this._baseUrl}/alpha/${code}?fields=name,cca3`);
  }

  getCountriesByCode(borders: string[]): Observable<SmallCountry[]> {
    if (!borders){
      return of([]);
    }

    const requests: Observable<SmallCountry>[]= [];
     borders.forEach( code => {
      const request = this.getCountryByCode(code);
      requests.push(request);
     })

     return combineLatest( requests);


  }
}



