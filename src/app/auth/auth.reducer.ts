import * as fromAuth from './auth.actions';
import {User} from './user.model';

export interface AuthState {
  user: User;
}

export const initalState: AuthState = {
  user: null
};

export function authReducer(state = initalState, action: fromAuth.AuthActions): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {...state, user: {...action.user}};
    default:
      return state;
  }
}
