export class Cee {
  id: number;
  name: string
  form: string;
  source: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
