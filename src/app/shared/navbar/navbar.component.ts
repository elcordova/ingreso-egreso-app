import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  username: Observable<string>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.username = this.store.select('auth').pipe(
      filter(value => !!value.user),
      select(state => state.user.nombre)
    );
  }

}
