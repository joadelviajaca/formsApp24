import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(private fb: FormBuilder){}

  nameSurnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'
  emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.nameSurnamePattern)]],
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })

  invalidField(field: string){
    return this.myForm.get(field)?.invalid 
            && this.myForm.get(field)?.touched;

  }

  submit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
  }

}
