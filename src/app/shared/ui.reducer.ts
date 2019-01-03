import * as fromUI from './ui.actions';

export interface UiState {
  loading: boolean;
}

export const UiInitialState: UiState = {
  loading: false
};

export function uiReducer(oldState = UiInitialState, action: fromUI.UiActions): UiState {
  switch (action.type) {
    case fromUI.DESACTIVAR_LOADING:
      return {...oldState, loading: false};
    case fromUI.ACTIVAR_LOADING:
      return {...oldState, loading: true};
    default:
      return oldState;
  }
}
