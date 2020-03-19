import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { Utils } from 'src/app/core/app-utils';
import { UniqueUsernameValidator } from 'src/app/shared/validators/unique-username-validator';
import { AuthService } from '../auth.service';
import { SyncValidators } from 'src/app/shared/validators/sync-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('passwordRef', { static: true }) passwordRef;
  @ViewChild('confirmPasswordRef', { static: true }) confirmPasswordRef;
  signupForm: FormGroup;
  signupSub: Subscription;
  title: string = Utils.headerTitles.signup;

  constructor(
    private fb: FormBuilder,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('PasswordRef', this.passwordRef);
    console.log('ConfirmPasswordRef', this.confirmPasswordRef);
    this.initializeForm();
  }

  private initializeForm() {
    this.signupForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-z0-9]+$/)
          ],
          [this.uniqueUsernameValidator.validate]
        ],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        passwordConfirmation: [
          '',
          [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
        ]
      },
      { validators: SyncValidators.crossFieldsMatch('password', 'passwordConfirmation') }
    );
  }

  checkMatchError() {
    if (this.signupForm.errors) {
      return this.passwordRef.control.touched &&
        this.passwordRef.control.dirty &&
        this.confirmPasswordRef.control.touched &&
        this.confirmPasswordRef.control.dirty &&
        this.signupForm.errors.passwordMatchFails
        ? 'is-invalid'
        : '';
    }
  }

  onSubmit() {
    if (!this.signupForm.valid) return;
    this.signupSub = this.authService.onSignup(this.signupForm.value).subscribe(val => {
      this.router.navigate(['/inbox']);
    });
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.signupSub)) {
      this.signupSub.unsubscribe();
    }
  }
}
