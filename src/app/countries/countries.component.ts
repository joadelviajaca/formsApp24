import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../shared/services/countries.service';
import { JsonPipe, LowerCasePipe } from '@angular/common';
import { SmallCountry } from '../shared/interfaces/countries';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, LowerCasePipe],
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit {

  regions: string[] = [];
  countries: SmallCountry[] = [];
  borders: SmallCountry[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // this.myForm.get('region')?.valueChanges
    // .subscribe( region => {
    //   this.countriesService.getCountriesByRegion(region)
    //   .subscribe({
    //     next: countries => this.countries = countries.sort(function (a, b){
    //       return ( a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()))
    //   }),
    //     error: error => console.log(error)
    //   })
    // }

    // )

    this.myForm.get('region')?.valueChanges
      .pipe(
        tap(region => {
          this.myForm.get('country')?.reset('');
          this.loading = true;
        }),
        switchMap(region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe({
        next: countries => {
          this.countries = countries.sort(function (a, b) {
            return (a.name.common.toLocaleLowerCase().localeCompare(b.name.common.toLocaleLowerCase()))
          });
          this.loading = false;
        },
        error: error => console.log(error)

      })

    this.myForm.get('country')?.valueChanges
      .pipe(
        tap(code => {
          this.myForm.get('border')?.reset('');
          this.loading = true;  
        }),
        switchMap(code => this.countriesService.getCountryBorders(code)),
        switchMap(country => this.countriesService.getCountriesByCode(country?.borders!))
      )
      .subscribe({
        next: countries => {

          this.borders = countries || []
          this.loading = false;
        }
      })
  }

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

}
