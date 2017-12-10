import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { LogStateActions, IAppState } from '../store';
import { LoginState } from '../models';
import { handleSub } from '../util';

@Injectable()
export class AdminGuard implements CanActivate, OnDestroy {
  private loggedIn: LoginState = LoginState.notLoggedIn;
  private loggedInSub;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
    this.loggedInSub = ngRedux.select<LoginState>('loginState')
    .subscribe(state => {
      this.loggedIn = state;
    });
  }

  canActivate() {
    console.log(this.loggedIn === LoginState.admin);
    return this.loggedIn === LoginState.admin;
  }

  ngOnDestroy() {
    handleSub(this.loggedInSub);
  }
}