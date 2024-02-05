import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../shared/validators/validators.service';
import { ValidateEmailService } from '../../shared/validators/validate-email.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(
    private fb: FormBuilder, 
    private validatorsService: ValidatorsService,
    private emailValidatorService: ValidateEmailService){}


  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.nameSurnamePattern)]],
    email: ['', [Validators.required, Validators.email], [this.emailValidatorService]],
    login: ['', [Validators.required, this.validatorsService.forbiddenNameValidator('fran')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  },{validators: [this.validatorsService.equalFields('password', 'confirmPassword')]})

  invalidField(field: string){
    return this.myForm.get(field)?.invalid 
            && this.myForm.get(field)?.touched;

  }
  get emailErrorMsg(): string {
    const errors = this.myForm.get('email')?.errors ;
    let errorMsg: string = '';
    if(errors){
      if( errors['required']){
        errorMsg = 'El email es obligatorio';
      }
      else if(errors['email']){
        errorMsg = 'El email no tiene formato de correo';
      }
      else if(errors['emailTaken']){
        errorMsg = 'El email ya está en uso'
      }
      
    }
    return errorMsg;
  }

  submit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
    if(this.myForm.valid){
      //enviarlo a la api
      console.log('Enviado')
    }
  }

}
