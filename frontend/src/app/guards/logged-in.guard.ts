import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).loggedIn();
};
