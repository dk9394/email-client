import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, CoreModule, SharedModule]
})
export class AuthModule {}
