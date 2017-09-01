export class Cee {
  id: number;
  name: string;
  state: string;
  animal: boolean;
  vegetable: boolean;
  mineral: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
