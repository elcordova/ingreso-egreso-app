import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {
  form: FormGroup;
  type = 'ingreso';

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'value': new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {
    console.log(this.form.value);
  }

}
