export class Cee {
  id: number;
  name: string;
  state: string;
  animal: boolean;
  vegetable: boolean;
  mineral: boolean;
  image: File;
  image_url: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
