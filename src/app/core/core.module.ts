import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';

import { FooterComponent } from './components/footer/footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageHeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, PageHeaderComponent, PageNotFoundComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class CoreModule {}
