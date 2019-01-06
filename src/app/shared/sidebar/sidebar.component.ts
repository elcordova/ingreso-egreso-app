import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {IngresoEgresoService} from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public user: Observable<any>;

  constructor(private authService: AuthService, private store: Store<AppState>, public ingresosEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.user = this.store.select('auth')
      .pipe(
        filter(state => !!state.user),
        select(state => state.user.nombre)
      );
  }

  logout($event) {
    this.authService.logOut();
    this.ingresosEgresoService.cancelSubscriptions();
  }
}
