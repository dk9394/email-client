import { Component, OnInit, OnDestroy } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { ICurrentUser } from 'src/app/auth/auth-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: ICurrentUser;
  currentUserSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUserSub = this.authService
      .getCurrentUser()
      .subscribe(user => (this.currentUser = user));
  }

  onSignOut() {
    this.authService.onSignout().subscribe();
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.currentUserSub)) {
      this.currentUserSub.unsubscribe();
    }
  }
}
