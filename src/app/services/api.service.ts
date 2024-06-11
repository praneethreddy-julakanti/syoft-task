import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/sign-up.model';
import { Signin } from '../models/sign-in.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = "https://eazyrooms-staging.codeace.us/api";

  signUp(data: Signup): Observable<any> {
    return this.http.post(`${this.apiUrl}/user_registeration`, data);
  }

  signIn(data: Signin): Observable<any> {
    return this.http.post(`${this.apiUrl}/userlogin`, data);
  }

}
