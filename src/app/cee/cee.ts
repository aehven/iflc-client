export class Cee {
  id: number;
  name: string;
  state: string;
  animal: boolean;
  vegetable: boolean;
  mineral: boolean;
  image: File;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
