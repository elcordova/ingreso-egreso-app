import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Observable} from 'rxjs';
import {IngresoEgresoService} from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import {IngresoEgresoModel} from '../ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {
  itemsObservable: Observable<any>;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.itemsObservable = this.store.pipe(select((state) => state.ingresoEgreso.items));
  }

  deleteItem(item: IngresoEgresoModel) {
    this.ingresoEgresoService.deleteIngresoEgreso(item.uid)
      .then(() => {
        Swal('Eliminado', item.description, 'success');
      })
      .catch(err => {
        Swal('Error en eliminar', err.message, 'error');
      });
  }
}
