import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILogin } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private LOGIN_URL: string = 'http://fake.com/user/login';
  loginError: any;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  loginUser(data: ILogin): Observable<ILogin> {
    return this.http.post<ILogin>(this.LOGIN_URL, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
