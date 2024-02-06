import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router){}

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.email]],
    password: ['', [Validators.required]]
  })

  submit(){
    if(this.myForm.valid){
      const {email, password} = this.myForm.value;
      this.authService.login(email, password)
      .subscribe(
        resp => {
          if (resp===true) {
            this.router.navigateByUrl('/template');
          }
          else {
            Swal.fire('Error', resp , 'error')
          }
        }
      )
    }
    else{
      this.myForm.markAllAsTouched()
    }
  }
}
