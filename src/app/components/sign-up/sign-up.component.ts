import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/models/sign-up.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;
  hidePassword: boolean = true;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      user_firstname: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      user_password: ['', [Validators.required, Validators.minLength(6)]],
      user_lastname: ['', Validators.required],
      user_city: ['', Validators.required],
      user_zipcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    })
  }

  onSubmit() {
    if(this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
    } else {
      const signUp: Signup = this.signupForm.value;
      this.apiService.signUp(signUp).subscribe({
        next: (response: any) => {
        alert(response.msg);
        this.router.navigate(['/signin'])
        },
        error: (err: any) => {
          alert('Error:'+ err);
        }
      })
    }
  }

}
