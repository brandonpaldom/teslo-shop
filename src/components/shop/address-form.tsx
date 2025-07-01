'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { createAddress, removeAddress } from '@/actions/checkout';
import type { Address, Country } from '@/interfaces';
import { type AddressData, addressSchema } from '@/schemas';
import { useAddressStore } from '@/stores';
import Button from '../ui/button';
import Checkbox from '../ui/form/checkbox';
import Input from '../ui/form/input';
import Select from '../ui/form/select';

interface Props {
  countries: Country[];
  addressData?: Partial<Address>;
  onSubmitSuccess?: () => void;
}

export default function AddressForm({
  countries,
  addressData = {},
  onSubmitSuccess,
}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddressData>({
    defaultValues: {
      ...addressData,
      saveAddress: false,
    },
    resolver: zodResolver(addressSchema),
  });

  const { data: session } = useSession({ required: true });
  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, [address, reset]);

  const onSubmit: SubmitHandler<AddressData> = async (data: AddressData) => {
    const { saveAddress, ...rest } = data;
    setAddress(rest);

    if (saveAddress) {
      await createAddress(rest, session?.user.id as string);
    } else {
      await removeAddress(session?.user.id as string);
    }

    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.push('/checkout');
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-[768px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        error={errors.firstName}
        id="firstName"
        label="First Name"
        register={register('firstName')}
      />
      <Input
        error={errors.lastName}
        id="lastName"
        label="Last Name"
        register={register('lastName')}
      />
      <Input
        error={errors.address}
        id="address"
        label="Address"
        register={register('address')}
      />
      <Input
        error={errors.apartment}
        id="apartment"
        label="Apartment, suite, etc. (optional)"
        register={register('apartment')}
      />
      <Input
        error={errors.zipCode}
        id="zipCode"
        label="Zip Code"
        register={register('zipCode')}
      />
      <Input
        error={errors.city}
        id="city"
        label="City"
        register={register('city')}
      />
      <Input
        error={errors.state}
        id="state"
        label="State"
        register={register('state')}
      />
      <Select
        error={errors.country}
        id="country"
        label="Country"
        register={register('country')}
      >
        {Array.isArray(countries) ? (
          countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))
        ) : (
          <option value="">No countries available</option>
        )}
      </Select>
      <Input
        error={errors.phone}
        id="phone"
        label="Phone Number"
        register={register('phone')}
        type="tel"
      />
      <Checkbox
        id="saveAddress"
        label="Save this information for next time"
        register={register('saveAddress')}
      />
      <Button disabled={isSubmitting} size="lg" variant="primary">
        Continue to Payment
      </Button>
    </form>
  );
}
