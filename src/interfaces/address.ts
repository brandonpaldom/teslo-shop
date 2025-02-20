export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  saveAddress?: boolean;
}
