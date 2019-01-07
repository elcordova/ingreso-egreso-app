import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {IngresoEgresoModel} from './ingreso-egreso.model';
import {IngresoEgresoService} from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';
import {AppState} from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  type = 'ingreso';
  subscriptions = new Subscription();
  loading: boolean;

  constructor(private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('ui')
      .subscribe(ui => {
        this.loading = ui.loading;
      });

    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'value': new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const newIngresoEgreso = new IngresoEgresoModel({...this.form.value, type: this.type});
    this.ingresoEgresoService.crearIngresoEgreso(newIngresoEgreso)
      .then(res => {
        Swal('Creado', newIngresoEgreso.description, 'success');
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal(`Error al registrar ${this.type}`, err.message, 'error');
      });
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
