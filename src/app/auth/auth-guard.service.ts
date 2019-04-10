import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as froamApp from '../store/app.reducers';
import * as froamAuth from './store/auth.reducers';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    // private authService: AuthService,
    private store: Store<froamApp.AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.isAuthenticated();
    return this.store.select('auth').pipe(take(1),map((authState: froamAuth.State) => {
      return authState.authenticated;
    }));
  }
}
