import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}
  // Will apply on FormControl
  validate = (formControl: FormControl): Observable<ValidationErrors> => {
    const { value } = formControl;
    return this.authService.checkUserAvailability(value).pipe(
      // Success means user is available always, because unsuccess is always handled as error in catchError
      map(val => null),
      catchError(err => {
        if (err.error.username) {
          return of({ notAvailable: true });
        }
        return of({ noConnection: true });
      })
    );
  };
}
