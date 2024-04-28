import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEwNjk0ZWZkLTk1NzMtNGQ5NS05MjM3LWYwYzBhNzU4YzdlZiIsIkFjY291bnRJZCI6IjVmMmMyN2M0LTc4NDYtNDgyNS1iYzRkLTZkMzY5Njg2MTM0ZSIsIk5hbWUiOiJhbHlvbnRhMDNAbWFpbC5ydSIsIkVtYWlsIjoiYWx5b250YTAzQG1haWwucnUiLCJyb2xlIjpbIkFkbWluaXN0cmF0b3IiLCJTdHVkZW50Il0sIm5iZiI6MTcxNDMxNjA1MCwiZXhwIjoxNzE1MTgwMDUwLCJpYXQiOjE3MTQzMTYwNTAsImlzcyI6Ikp3dFRlc3RJc3N1ZXIiLCJhdWQiOiJKd3RUZXN0Q2xpZW50In0.XjKDZlRUlKggSl4FNdPuoiUnICw3NeR5FGyy8c5FX1w';
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);
};
