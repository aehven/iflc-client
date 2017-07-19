export class Activity {
  id: number;
  account_id: number;
  date: any;
  text: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
