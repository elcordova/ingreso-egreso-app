import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IngresoEgresoModel} from '../ingreso-egreso.model';
import {AppState} from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;
  subscriptions = new Subscription();

  public doughnutChartLabels: string[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscriptions.add(this.store.select('ingresoEgreso').subscribe(ingresoEgresoObject => {
      this.resetValues();
      this.contarIngresosEgreso(ingresoEgresoObject.items);
    }));
  }

  private resetValues() {
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;
  }

  private contarIngresosEgreso(items: IngresoEgresoModel[]) {
    items.forEach(item => {
      if (item.type === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.value;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.value;
      }
    });

    this.doughnutChartData = [this.egresos, this.ingresos];
  }
}
