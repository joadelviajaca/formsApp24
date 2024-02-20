import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../shared/validators/validators.service';
import { ValidateEmailService } from '../../shared/validators/validate-email.service';
import { compileNgModule } from '@angular/compiler';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  imageUrl : string = ''
  
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: ValidateEmailService,
    private uploadService: UploadService) { }


  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.nameSurnamePattern)]],
    email: ['', [Validators.required, Validators.email], [this.emailValidatorService]],
    login: ['', [Validators.required, this.validatorsService.forbiddenNameValidator('fran')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    image: [null]
  }, { validators: [this.validatorsService.equalFields('password', 'confirmPassword')] })

  invalidField(field: string) {
    return this.myForm.get(field)?.invalid
      && this.myForm.get(field)?.touched;

  }

  submit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
    this.uploadService.uploadFile(this.imageUrl)
    .subscribe(resp => console.log(resp))
    if (this.myForm.valid) {
      //enviarlo a la api
      console.log('Enviado')
    }
  }

  getFile(event: Event) {
    
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('Got here: ', typeof(e.target.result));
        this.imageUrl = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }

    } 
    //   this.myForm.patchValue({ image: file });
    //   this.myForm.get('image')?.updateValueAndValidity();
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imagePreview = reader.result.toString();
    //   };
    //   event.target.files instanceof FileList
    //           ? reader.readAsDataURL(event.target.files[0]) : 'handle exception'
    //   reader.readAsDataURL(file);
    // }
  

}
