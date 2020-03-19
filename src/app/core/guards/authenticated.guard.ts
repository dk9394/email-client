import { Injectable } from '@angular/core';
import { Router, CanLoad, UrlSegment } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { map, skipWhile, take, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSignedinStatus().pipe(
      map(val => !val.authenticated),
      skipWhile(val => null === val),
      take(1),
      tap(isNotAuthenticated => {
        if (isNotAuthenticated) {
          return true;
        }
        this.router.navigate(['/inbox']);
        return false;
      })
    );
  }
}
