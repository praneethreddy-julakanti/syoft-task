import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signin } from 'src/app/models/sign-in.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm!: FormGroup;
  hidePassword: boolean = true;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      user_email: ['', Validators.required],
      user_password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
    } else {
      const signin: Signin = this.signinForm.value;
      this.apiService.signIn(signin).subscribe({
        next: (response: any) => {
          alert(response.msg);
          if(response.status) {
            localStorage.setItem('userData', response.user_data);
            this.router.navigate(['/dashboard'])
          }
        },
        error: (err: any) => {
          alert('Error:'+ err);
        }
      })
    }
  }

}
