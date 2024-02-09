import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){}


  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  login(){
    if(this.myForm.valid){
      const {email, password} = this.myForm.value
      this.authService.login(email, password)
      .subscribe(
        resp => {
          if (resp===true){
            this.router.navigateByUrl('/template')
          }
          else{
            Swal.fire({
              title: 'Error!',
              text: <string>resp,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        }
      )
    }
    else{
      this.myForm.markAllAsTouched()
    }
  }

}
