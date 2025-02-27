export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  zipCode: string;
  city: string;
  state: string;
  country?: string;
  countryId?: string;
  phone: string;
  saveAddress?: boolean;
}
