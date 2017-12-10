import { Action } from 'redux';
import { LogStateActions } from './actions';
import { LoginState } from '../models';

export interface IAppState {
  loginState: LoginState;
  token: string;
}

interface ActionPayload extends Action {
  payload: any;
}

export const INITIAL_STATE: IAppState = {
  loginState: LoginState.notLoggedIn,
  token: '',
};

export function rootReducer(lastState: IAppState, action: ActionPayload): IAppState {
  switch(action.type) {
    case LogStateActions.LOGINADMIN: return { loginState: LoginState.admin, token: lastState.token };
    case LogStateActions.LOGINGUEST: return { loginState: LoginState.guest, token: lastState.token };
    case LogStateActions.LOGINREGISTERED: return { loginState: LoginState.registered, token: lastState.token };
    case LogStateActions.LOGOUT: return { loginState: LoginState.notLoggedIn, token: lastState.token };
    case LogStateActions.SETTOKEN: return { loginState: lastState.loginState, token: action.payload };
  }

  // We don't care about any other actions right now.
  return lastState;
}