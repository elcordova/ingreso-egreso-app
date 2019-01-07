import * as fromIngresoEgreso from './ingreso-egreso.actions';
import {IngresoEgresoModel} from './ingreso-egreso.model';
import {AppState} from '../app.reducer';

export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

export interface AppState extends AppState {
  ingresoEgreso: IngresoEgresoState;
}

export const initialIngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer(oldState = initialIngresoEgresoState, action: fromIngresoEgreso.actions): IngresoEgresoState {
  switch (action.type) {
    case fromIngresoEgreso.SET_ITEMS:
      return {
        ...oldState,
        items: action.items.map(item => {
          return {...item};
        })
      };
    case fromIngresoEgreso.UNSET_ITEMS:
      return {...oldState, items: []};
    default:
      return {...oldState};
  }
}
