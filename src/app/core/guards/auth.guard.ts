import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { skipWhile, take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkSignedinStatus().pipe(
      map(val => val.authenticated),
      skipWhile(val => null === val),
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
