export class Note {
  id: number;
  cee_id: number;
  date: any;
  text: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
