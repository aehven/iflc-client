export class Favorite {
  id: number;
  favoritable_type: string;
  favoritable_id: number;
  user_id: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
