import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'inbox',
    canLoad: [AuthGuard],
    loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule)
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
