import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

import { Utils } from 'src/app/core/app-utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  title: string = Utils.headerTitles.signin;
  signinSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.signinForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/)
        ]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
      ]
    });
  }

  onSubmit() {
    if (!this.signinForm.valid) return;
    this.signinSub = this.authService
      .onSignin(this.signinForm.value)
      .subscribe(res => {
        this.router.navigate(['/inbox']);
      });
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.signinSub)) {
      this.signinSub.unsubscribe();
    }
  }
}
