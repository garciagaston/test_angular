import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

import {
  LOGIN_MOCKED_SUCCESS_EMAIL,
  LOGIN_MOCKED_SUCCESS_PASSWORD,
} from '../../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  LOGIN_MOCKED_SUCCESS_EMAIL: string = LOGIN_MOCKED_SUCCESS_EMAIL;
  LOGIN_MOCKED_SUCCESS_PASSWORD: string = LOGIN_MOCKED_SUCCESS_PASSWORD;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.getItem('token')) {
      this.navigateToProducts();
    }
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
}
