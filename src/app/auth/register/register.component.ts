import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(private fb: FormBuilder) {}

  nameSurnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'
  emailPattern: string = '';

  forbiddenJoadelviaValidator( argument: any) {
    console.log(argument)
  }

  myForm: FormGroup = this.fb.group({
    name: ['' , [Validators.required, Validators.pattern(this.nameSurnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    username: ['', [Validators.required, this.forbiddenJoadelviaValidator]]
  })

  invalidField(field: string){
    return this.myForm.get(field)?.invalid 
            && this.myForm.get(field)?.touched;

  }

  submit(){
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }


}
