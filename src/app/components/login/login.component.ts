import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
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
export class LoginComponent {
  LOGIN_MOCKED_SUCCESS_EMAIL: string = LOGIN_MOCKED_SUCCESS_EMAIL;
  LOGIN_MOCKED_SUCCESS_PASSWORD: string = LOGIN_MOCKED_SUCCESS_PASSWORD;
}
