import {Component, OnInit} from '@angular/core';
import {IngresoEgresoService} from '../ingreso-egreso/ingreso-egreso.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgrsoListener();
  }

  private ingresoEgresoItems(uid: string){

  }

}
