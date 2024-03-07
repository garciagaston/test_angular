import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILogin } from '../models/login.model';
import { LocalStorageService } from './local-storage.service';
import { LOGIN_URL } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginError: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  loginUser(data: ILogin): Observable<any> {
    return this.http.post<ILogin>(LOGIN_URL, data);
  }

  logout() {
    this.localStorageService.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.localStorageService.getItem('token');
  }
}
