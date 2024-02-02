import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

 nameSurnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'
emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

forbiddenNameValidator (username: string): ValidatorFn{

  return (control: AbstractControl): ValidationErrors | null => {
    const usernameInput : string = control.value.trim().toLowerCase();
    if(usernameInput === username){
      return { usernameForbidden: true};
    }

    return null;
  }
}

equalFields (field1: string, field2: string) : ValidatorFn{
  return (formControl: AbstractControl): ValidationErrors | null => {
    const field1Input : string = formControl.get(field1)?.value;
    const field2Input : string = formControl.get(field2)?.value;

    if (field1Input !== field2Input) {
      formControl.get(field2)?.setErrors({ nonEquals: true})
      return { nonEquals: true};
      
    }
    
    formControl.get(field2)?.setErrors(null)
    return null
  }
}

  constructor() { }
}
