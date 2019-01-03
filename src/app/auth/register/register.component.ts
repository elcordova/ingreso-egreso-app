import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  public cargando: boolean;

  constructor(private authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.store
        .select('ui')
        .subscribe(ui => {
          this.cargando = ui.loading;
        }));

  }

  onSumit(f: any) {
    this.authService.createUser(f.name, f.email, f.password);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
