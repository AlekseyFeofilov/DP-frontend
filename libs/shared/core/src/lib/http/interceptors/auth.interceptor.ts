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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImZjMWJlZDJjLTE5NWItNDg2Ni04NGU4LTFmN2NjZjhiNGIyMSIsIkFjY291bnRJZCI6IjVmMmMyN2M0LTc4NDYtNDgyNS1iYzRkLTZkMzY5Njg2MTM0ZSIsIk5hbWUiOiLQotCw0YDQsNGB0L7QstCwINCQ0LvRkdC90LAg0JLQsNGB0LjQu9GM0LXQstC90LAgIiwiRW1haWwiOiJhbHlvbnRhMDNAbWFpbC5ydSIsInJvbGUiOlsiQWRtaW5pc3RyYXRvciIsIlN0dWRlbnQiLCJTdGFmZiJdLCJuYmYiOjE3MTQ5NDAwMjIsImV4cCI6MTcxNTgwNDAyMiwiaWF0IjoxNzE0OTQwMDIyLCJpc3MiOiJKd3RUZXN0SXNzdWVyIiwiYXVkIjoiSnd0VGVzdENsaWVudCJ9.Zo5y22fwu0pMZISJQeKKvmUs8KVnmlmNpolZxjNj6-o';
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);
};
