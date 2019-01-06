import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgresoModel} from './ingreso-egreso.model';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {filter, map} from 'rxjs/operators';
import {SetItemsActions, UnsetItemsActions} from './ingreso-egreso.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  ingresoEgresoSubscriptions: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, private authService: AuthService, private store: Store<AppState>) {
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel): Promise<any> {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items').add({...ingresoEgreso});
  }

  deleteIngresoEgreso(uid: String) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }

  initIngresoEgrsoListener() {
    this.ingresoEgresoSubscriptions.add(this.store.select('auth')
      .pipe(filter(auth => !!auth.user))
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      }));
  }

  private ingresoEgresoItems(uid: String) {
    this.ingresoEgresoSubscriptions.add(this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(map(snapshot => {
          return snapshot.map(s => {
            return {
              uid: s.payload.doc.id, ...s.payload.doc.data()
            };
          });
        })
      )
      .subscribe((collection: any) => {
        this.store.dispatch(new SetItemsActions(collection));
      }));
  }

  cancelSubscriptions() {
    this.ingresoEgresoSubscriptions.unsubscribe();
    this.store.dispatch(new UnsetItemsActions());
  }
}
