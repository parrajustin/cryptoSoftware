import { Injectable } from '@angular/core';
import { Action } from 'redux';

interface ActionPayload extends Action {
  payload: any;
}

@Injectable()
export class LogStateActions {
  static LOGINGUEST = "GUEST";
  static LOGINREGISTERED = "REGISTERED";
  static LOGINADMIN = "ADMIN";
  static LOGOUT = "LOGOUT";
  static SETTOKEN = "TOKEN";

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

  setToken(token: {token: string; name: string;}): ActionPayload {
    return { type: LogStateActions.SETTOKEN, payload: token };
  }
}