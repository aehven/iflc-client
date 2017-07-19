export class User {
  id: any;
  email: any;
  first_name: any;
  last_name: any;
  role: any;
  address: any;
  phone: any;
  favorite_accounts: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
