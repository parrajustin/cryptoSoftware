import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class LogStateActions {
  static LOGINGUEST = "GUEST";
  static LOGINREGISTERED = "REGISTERED";
  static LOGINADMIN = "ADMIN";
  static LOGOUT = "LOGOUT";

  adminLogin(): Action {
    return { type: LogStateActions.LOGINADMIN };
  }

  registeredLogin(): Action {
    return { type: LogStateActions.LOGINREGISTERED };
  }

  logout(): Action {
    return { type: LogStateActions.LOGOUT };
  }

  guestLogin(): Action {
    return { type: LogStateActions.LOGINGUEST };
  }
}