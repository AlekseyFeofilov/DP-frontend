import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { TOKEN } from '../../auth/consts/token';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${TOKEN}`),
  });

  return next(modifiedReq);
};
