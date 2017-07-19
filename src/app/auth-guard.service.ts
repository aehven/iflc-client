/////
// https://angular.io/docs/ts/latest/guide/router.html#!#can-activate-guard
/////

import { Injectable }       from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public tokenService: Angular2TokenService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    console.log(this.tokenService.currentAuthData);
    //on startup, check if token is valid, if it is, sign in as user in cookie.
    if (this.tokenService.currentAuthData) { return true; }

    // Store the attempted URL for redirecting
    // this.tokenService.redirectUrl = url;

    // Create a dummy session id
    // let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      // queryParams: { 'session_id': sessionId },
      // fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
