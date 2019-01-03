import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  cargando: boolean;

  constructor(private authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('ui').subscribe(ui => {
      this.cargando = ui.loading;
    });
  }

  login(value: any) {
    this.authService.logIn(value.email, value.password);
  }
}
