import {ApplicationConfig, inject} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([injectAuthToken])
    ),
    provideAnimations()
  ]
};

function injectAuthToken(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = inject(AuthService).token;
  if (token) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', token),
    });
    return next(newReq);
  }
  return next(req);
}
