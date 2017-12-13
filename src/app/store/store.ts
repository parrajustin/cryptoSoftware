import { Action } from 'redux';
import { LogStateActions } from './actions';
import { LoginState } from '../models';

export interface IAppState {
  loginState: LoginState;
  token: string;
  name: string;
}

interface ActionPayload extends Action {
  payload: any;
}

export const INITIAL_STATE: IAppState = {
  loginState: LoginState.notLoggedIn,
  token: '',
  name: ''
};

export function rootReducer(lastState: IAppState, action: ActionPayload): IAppState {
  switch(action.type) {
    case LogStateActions.LOGINADMIN: return { loginState: LoginState.admin, token: lastState.token, name: lastState.name };
    case LogStateActions.LOGINGUEST: return { loginState: LoginState.guest, token: lastState.token, name: lastState.name };
    case LogStateActions.LOGINREGISTERED: return { loginState: LoginState.registered, token: lastState.token, name: lastState.name };
    case LogStateActions.LOGOUT: return { loginState: LoginState.notLoggedIn, token: '', name: '' };
    case LogStateActions.SETTOKEN: return { loginState: lastState.loginState, token: action.payload['token'], name: action.payload['name'] };
  }

  // We don't care about any other actions right now.
  return lastState;
}