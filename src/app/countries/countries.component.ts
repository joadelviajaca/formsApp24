import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../shared/services/countries.service';
import { JsonPipe, LowerCasePipe } from '@angular/common';
import { SmallCountry } from '../shared/interfaces/countries';
import { delay, switchMap, tap } from 'rxjs';

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
          this.myForm.get('country')?.reset('');
          this.loading = true;
          
        }),
        // delay(2000),
        switchMap( region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe({
        next: countries => {
          this.countries = countries.sort((a,b)=> (a.name.common.toLocaleLowerCase().localeCompare(b.name.common)));
          this.loading = false;
        },
        error: error => {
          console.log(error);
          this.loading = false;
        }
      })

    this.myForm.get('country')?.valueChanges
    .pipe(
      tap( code => {
        this.myForm.get('border')?.reset('')
        this.loading = true
       } ),
      switchMap( code => this.countriesService.getBordersByCountry(code)),
      switchMap( borders => this.countriesService.getCountriesByCode(borders?.borders!))
    )
    .subscribe({
      next: countries => {
        this.borders = countries.sort((a,b)=> (a.name.common.toLocaleLowerCase().localeCompare(b.name.common)));
        this.loading = false;
      },
      error: error => {
        this.loading = false;
      }
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
