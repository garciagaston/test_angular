import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { LocalStorageService } from './local-storage.service';
import { ILogin } from '../models/login.model';
import { ProductsComponent } from '../components/products/products.component';
import { LoginComponent } from '../components/login/login.component';
import { LOGIN_URL } from '../../constants';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  const MOCKED_TOKEN = 'MOCK_TOKEN';
  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'removeItem',
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'products', component: ProductsComponent },
        ]),
      ],
      providers: [
        LoginService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageServiceSpy = TestBed.inject(
      LocalStorageService,
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {
    const mockData: ILogin = { email: 'fake@demo.com', password: '123456' };
    const mockResponse: any = { token: MOCKED_TOKEN };

    service.loginUser(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(LOGIN_URL);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout user', () => {
    service.logout();
    expect(localStorageServiceSpy.removeItem).toHaveBeenCalledWith('token');
  });

  it('should check if user is logged in', () => {
    localStorageServiceSpy.getItem.and.returnValue(MOCKED_TOKEN);
    expect(service.isLoggedIn()).toBeTrue();

    localStorageServiceSpy.getItem.and.returnValue(null);
    expect(service.isLoggedIn()).toBeFalse();
  });
});
