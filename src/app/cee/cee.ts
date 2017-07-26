export class Cee {
  id: number;
  name: string
  phone: string;
  fax: string;
  email: string;
  website: string;
  city: string;
  state: string;
  street: string;
  zip: string;
  kind: string;
  om: string;
  fd1: string;
  fd2: string;
  rc: string;
  referrer: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
