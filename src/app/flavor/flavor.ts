export class Flavor {
  id: number;
  first_name: string;
  last_name: string;
  cee_name: string;
  cee_id: number;
  ma: string;
  phone: string;
  cellphone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  kind: string;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
