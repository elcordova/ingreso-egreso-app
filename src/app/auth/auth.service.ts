import {Injectable} from '@angular/core';
import {AngularFireAuth} from '../../../node_modules/@angular/fire/auth';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }


  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      console.log(fbUser);
    });
  }

  createUser(name, email, pass) {
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, pass)
      .then(resp => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal('Error en registro', error.message, 'error');
      });
  }

  logIn(email: string, pass: string) {
    this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, pass)
      .then(resp => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal('Error en el login', error.message, 'error');
      });
  }

  logOut() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(obj => {
      this.router.navigate(['/login']);
      return !!obj;
    }));
  }
}
