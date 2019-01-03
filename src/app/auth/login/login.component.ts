import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscriptions.add(this.store.select('ui').subscribe(ui => {
      this.cargando = ui.loading;
    }));
  }

  login(value: any) {
    this.authService.logIn(value.email, value.password);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
