import {Injectable} from '@angular/core';
import {AngularFireAuth} from '../../../node_modules/@angular/fire/auth';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {AngularFirestore} from '../../../node_modules/@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';
import {SetUserAction} from './auth.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private angularFireDB: AngularFirestore,
              private store: Store<AppState>) {
  }


  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.angularFireDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj: any) => {
            const newUser = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(newUser));
            console.log(newUser);
          });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }

  createUser(name, email, pass) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, pass)
      .then(resp => {

        const user: User = {uid: resp.user.uid, email: resp.user.email, nombre: name};
        this.angularFireDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.store.dispatch(new DesactivarLoadingAction());
            this.router.navigate(['/']);
          });
      })
      .catch(error => {
        Swal('Error en registro', error.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      });
  }

  logIn(email: string, pass: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(resp => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        Swal('Error en el login', error.message, 'error');
        this.store.dispatch(new DesactivarLoadingAction());
      });
  }

  logOut() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(obj => {
      if (obj === null) {
        this.router.navigate(['/login']);
      }
      return !!obj;
    }));
  }
}
