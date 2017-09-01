export class Flavor {
  id: number;
  name: string;
  color: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
