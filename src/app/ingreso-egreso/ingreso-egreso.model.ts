export class IngresoEgresoModel {
  description: string;
  value: number;
  type: string;
  uid?: string;

  constructor(props) {
    this.description = props && props.description || null;
    this.value = props && props.value || null;
    this.type = props && props.type || null;
    this.uid = props && props.uid || null;
  }

}
