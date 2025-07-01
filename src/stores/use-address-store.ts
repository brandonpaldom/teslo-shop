import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AddressStore {
  address: {
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
  };
  setAddress: (address: AddressStore['address']) => void;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        zipCode: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        saveAddress: false,
      },
      setAddress: (address) =>
        set({
          address,
        }),
    }),
    {
      name: 'address',
    }
  )
);
