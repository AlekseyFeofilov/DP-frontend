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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjdjYzgwZGQzLWJlYjktNGVkOS05MzcyLTI1NDg3MzYzNWEwZCIsIkFjY291bnRJZCI6IjUwY2JkMjJkLTdlNTMtNGQyOS1hODY2LTllYWU1ZjgzYmQwYSIsIk5hbWUiOiLQpNC10L7RhNC40LvQvtCyINCQ0LvQtdC60YHQtdC5INCU0LzQuNGC0YDQuNC10LLQuNGHIiwiRW1haWwiOiJhbGV4ZmlsODg4QGdtYWlsLmNvbSIsInJvbGUiOiJTdGFmZiIsIm5iZiI6MTcxNjkyMTk1MiwiZXhwIjoxNzE3Nzg1OTUyLCJpYXQiOjE3MTY5MjE5NTIsImlzcyI6Ikp3dFRlc3RJc3N1ZXIiLCJhdWQiOiJKd3RUZXN0Q2xpZW50In0.DxLprxOeQmCXNqeS5yzPNprSWD3J5YAf-vpp8zhXUHE';
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);
};
