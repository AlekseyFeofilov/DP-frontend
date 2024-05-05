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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImZjMWJlZDJjLTE5NWItNDg2Ni04NGU4LTFmN2NjZjhiNGIyMSIsIkFjY291bnRJZCI6IjVmMmMyN2M0LTc4NDYtNDgyNS1iYzRkLTZkMzY5Njg2MTM0ZSIsIk5hbWUiOiLQotCw0YDQsNGB0L7QstCwINCQ0LvRkdC90LAg0JLQsNGB0LjQu9GM0LXQstC90LAgIiwiRW1haWwiOiJhbHlvbnRhMDNAbWFpbC5ydSIsInJvbGUiOlsiQWRtaW5pc3RyYXRvciIsIlN0dWRlbnQiXSwibmJmIjoxNzE0OTM2MDk3LCJleHAiOjE3MTU4MDAwOTcsImlhdCI6MTcxNDkzNjA5NywiaXNzIjoiSnd0VGVzdElzc3VlciIsImF1ZCI6Ikp3dFRlc3RDbGllbnQifQ.eJZiMoJg3uz2e5BZ2hU-9udMf_pCL1TC7p4ROvz0Vqc';
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);
};
