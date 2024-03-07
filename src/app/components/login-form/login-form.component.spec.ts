import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from '../products/products.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginFormComponent,
        ProductsComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'products', component: ProductsComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form validated', () => {
    component.loginForm.controls['email'].setValue('user@demo.com');
    component.loginForm.controls['password'].setValue('123456');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('login form error', () => {
    component.loginForm.controls['email'].setValue('user@');
    component.loginForm.controls['password'].setValue('123456');
    expect(component.loginForm.valid).toBeFalse();

    component.loginForm.controls['email'].setValue('user@demo.com');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();

    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();

    component.loginForm.controls['email'].setValue('user@demo.com');
    component.loginForm.controls['password'].setValue('1');
    expect(component.loginForm.valid).toBeFalse();
  });
});
