import { Action } from 'redux';
import { LogStateActions } from './actions';
import { LoginState } from '../models';

export interface IAppState {
  loginState: LoginState;
}

export const INITIAL_STATE: IAppState = {
  loginState: LoginState.notLoggedIn,
};

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  switch(action.type) {
    case LogStateActions.LOGINADMIN: return { loginState: LoginState.admin };
    case LogStateActions.LOGINGUEST: return { loginState: LoginState.guest };
    case LogStateActions.LOGINREGISTERED: return { loginState: LoginState.registered };
    case LogStateActions.LOGOUT: return { loginState: LoginState.notLoggedIn };
  }

  // We don't care about any other actions right now.
  return lastState;
}