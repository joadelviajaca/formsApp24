import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../shared/services/countries.service';
import { JsonPipe, LowerCasePipe } from '@angular/common';
import { SmallCountry } from '../shared/interfaces/countries';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, LowerCasePipe],
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit {

  regions: string[] = [];
  countries: SmallCountry[] = [];
  borders: string[] = [];

  constructor(private fb: FormBuilder,
    private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // this.myForm.get('region')?.valueChanges
    //   .subscribe(
    //     (region) => {
    //       this.myForm.get('country')?.reset('');
    //       this.countriesService.getCountriesByRegion(region)
    //         .subscribe({
    //           next: (countries) => {
    //             this.countries = countries;
    //             console.log(countries)
    //           },
    //         })
    //     })

    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( region => {
          this.myForm.get('country')?.reset(''),
          console.log('Region en tap: ',region)
        }),
        switchMap( region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe({
        next: countries => this.countries = countries.sort((a,b)=> (a.name.common.toLocaleLowerCase().localeCompare(b.name.common))),
        error: error => console.log(error)
      })

    this.myForm.get('country')?.valueChanges
    .pipe(
      tap( code => this.myForm.get('border')?.reset('') ),
      switchMap( code => this.countriesService.getBordersByCountry(code))
    )
    .subscribe({
      next: borders => this.borders = borders?.borders || []
    })
  }

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]]
  })


  save() {
    if (this.myForm.valid) {
      alert('Formulario enviado');
    }
    else {
      this.myForm.markAllAsTouched();
    }
  }

}
