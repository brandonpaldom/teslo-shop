"use client";

import { type AddressData, addressSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/button";
import type { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/stores";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { createAddress, removeAddress } from "@/actions/checkout";
import { useRouter } from "next/navigation";
import Input from "../ui/form/input";
import Select from "../ui/form/select";
import Checkbox from "../ui/form/checkbox";

interface Props {
  countries: Country[];
  addressData?: Partial<Address>;
}

export default function AddressForm({ countries, addressData = {} }: Props) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<AddressData> = async (data: AddressData) => {
    const { saveAddress, ...rest } = data;
    setAddress(rest);

    if (saveAddress) {
      await createAddress(rest, session?.user.id as string);
    } else {
      await removeAddress(session?.user.id as string);
    }

    router.push("/checkout");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-[768px]"
    >
      <Input
        label="First Name"
        id="firstName"
        register={register("firstName")}
        error={errors.firstName}
      />
      <Input
        label="Last Name"
        id="lastName"
        register={register("lastName")}
        error={errors.lastName}
      />
      <Input
        label="Address"
        id="address"
        register={register("address")}
        error={errors.address}
      />
      <Input
        label="Apartment, suite, etc. (optional)"
        id="apartment"
        register={register("apartment")}
        error={errors.apartment}
      />
      <Input
        label="Zip Code"
        id="zipCode"
        register={register("zipCode")}
        error={errors.zipCode}
      />
      <Input
        label="City"
        id="city"
        register={register("city")}
        error={errors.city}
      />
      <Input
        label="State"
        id="state"
        register={register("state")}
        error={errors.state}
      />
      <Select
        label="Country"
        id="country"
        register={register("country")}
        error={errors.country}
      >
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </Select>
      <Input
        label="Phone Number"
        id="phone"
        type="tel"
        register={register("phone")}
        error={errors.phone}
      />
      <Checkbox
        label="Save this information for next time"
        id="saveAddress"
        register={register("saveAddress")}
      />
      <Button variant="primary" size="lg" disabled={isSubmitting}>
        Continue to Payment
      </Button>
    </form>
  );
}
