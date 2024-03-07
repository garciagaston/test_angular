import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {
  LOGIN_URL,
  LOGIN_MOCKED_SUCCESS_EMAIL,
  LOGIN_MOCKED_SUCCESS_PASSWORD,
} from '../../constants';
import { ILogin } from '../models/login.model';

export const fakeApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if it's the request you want to mock
  if (req.url === LOGIN_URL && req.method === 'POST') {
    const loginData: ILogin = req.body as ILogin;
    // Mock response data
    if (
      loginData.email === LOGIN_MOCKED_SUCCESS_EMAIL &&
      loginData.password === LOGIN_MOCKED_SUCCESS_PASSWORD
    ) {
      // Return a fake success response
      return of(
        new HttpResponse({
          status: 200,
          body: {
            success: true,
            message: 'Mocked data',
            token: 'MOCKED_MOCKED_MOCKED_MOCKED_MOCKED_MOCKED',
          },
        }),
      );
    } else {
      // Return a fake failed response
      return of(
        new HttpResponse({
          status: 401,
          body: { success: false, message: 'Mocked failed data' },
        }),
      );
    }
  }

  // If not the request you want to mock, pass it through
  return next(req);
};
