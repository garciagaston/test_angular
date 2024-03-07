import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginService } from '../../services/login.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: 'login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginError: string = '';
  subscription!: Subscription;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,3})$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  userLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true; // Start the loading spinner

      this.subscription = this.loginService
        .loginUser(this.loginForm.value)
        .pipe(
          finalize(() => {
            this.loading = false; //Stop the loading spinner
          }),
        )
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.localStorageService.setItem('token', res.token);
              this.loginError = '';
              this.loginForm.reset();
              this.navigateToProducts();
            } else {
              this.loginError = 'Invalid email and password combination!';
            }
          },
          error: (error: any) => {
            this.loginError = 'An error occurred during login.';
            console.error('Login Error:', error);
          },
        });
    }
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    if (!this.subscription) {
      return;
    } else {
      return this.subscription.unsubscribe();
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Email is required.';
    }
    return this.loginForm.get('email')?.invalid ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Password is required.';
    }
    return this.loginForm.get('password')?.hasError('minlength')
      ? 'Password must be at least 6 characters.'
      : '';
  }
}
