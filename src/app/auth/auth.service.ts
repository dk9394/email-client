import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IUserAvailability } from '../shared/models';
import {
  ISignupCredentials,
  ISigninCredentials,
  ICurrentUser,
  ISignedinDetails
} from './auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'https://api.angular-email.com';
  private signedIn$ = new BehaviorSubject<boolean>(null);
  private currentUser$ = new BehaviorSubject<ICurrentUser>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getSignedinStatus() {
    return this.signedIn$.asObservable();
  }

  getCurrentUser() {
    return this.currentUser$.asObservable();
  }

  onSignup(credentials: ISignupCredentials): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(`${this.url}/auth/signup`, credentials).pipe(
      tap(res => {
        this.signedIn$.next(true);
        this.currentUser$.next(res);
      })
    );
  }

  onSignin(credentials: ISigninCredentials): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(`${this.url}/auth/signin`, credentials).pipe(
      tap(res => {
        this.signedIn$.next(true);
        this.currentUser$.next(res);
      })
    );
  }

  onSignout(): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/signout`, {}).pipe(
      tap(res => {
        this.signedIn$.next(false);
        this.currentUser$.next(null);
        this.router.navigate(['/']);
      })
    );
  }

  checkSignedinStatus(): Observable<ISignedinDetails> {
    return this.http.get<ISignedinDetails>(`${this.url}/auth/signedin`).pipe(
      tap(res => {
        this.signedIn$.next(res.authenticated);
        this.currentUser$.next({ username: res.username });
      })
    );
  }

  checkUserAvailability(newUserName: string): Observable<IUserAvailability> {
    return this.http.post<IUserAvailability>(`${this.url}/auth/username`, {
      username: newUserName
    });
  }
}
