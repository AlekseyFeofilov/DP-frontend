import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImZjMWJlZDJjLTE5NWItNDg2Ni04NGU4LTFmN2NjZjhiNGIyMSIsIkFjY291bnRJZCI6IjVmMmMyN2M0LTc4NDYtNDgyNS1iYzRkLTZkMzY5Njg2MTM0ZSIsIk5hbWUiOiLQotCw0YDQsNGB0L7QstCwINCQ0LvRkdC90LAg0JLQsNGB0LjQu9GM0LXQstC90LAgIiwiRW1haWwiOiJhbHlvbnRhMDNAbWFpbC5ydSIsInJvbGUiOlsiQWRtaW5pc3RyYXRvciIsIlN0dWRlbnQiLCJTdGFmZiJdLCJuYmYiOjE3MTYwNjE4NzMsImV4cCI6MTcxNjkyNTg3MywiaWF0IjoxNzE2MDYxODczLCJpc3MiOiJKd3RUZXN0SXNzdWVyIiwiYXVkIjoiSnd0VGVzdENsaWVudCJ9.v8WPLv-5_fRRzoiISfxy0kycv8_-GbuquJsglc9Iguo';
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);
};
