"use client";

import { type AddressData, addressSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/button";
import FormInput from "../ui/form-input";
import FormSelect from "../ui/form-select";
import type { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/stores";
import FormCheckbox from "../ui/form-checkbox";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { createAddress, removeAddress } from "@/actions/checkout";
import { useRouter } from "next/navigation";

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
      <FormInput
        label="First Name"
        id="firstName"
        register={register("firstName")}
        error={errors.firstName}
      />
      <FormInput
        label="Last Name"
        id="lastName"
        register={register("lastName")}
        error={errors.lastName}
      />
      <FormInput
        label="Address"
        id="address"
        register={register("address")}
        error={errors.address}
      />
      <FormInput
        label="Apartment, suite, etc. (optional)"
        id="apartment"
        register={register("apartment")}
        error={errors.apartment}
      />
      <FormInput
        label="Zip Code"
        id="zipCode"
        register={register("zipCode")}
        error={errors.zipCode}
      />
      <FormInput
        label="City"
        id="city"
        register={register("city")}
        error={errors.city}
      />
      <FormInput
        label="State"
        id="state"
        register={register("state")}
        error={errors.state}
      />
      <FormSelect
        label="Country"
        id="country"
        register={register("country")}
        error={errors.country}
        options={countries.map((country) => ({
          value: country.id,
          label: country.name,
        }))}
      />
      <FormInput
        label="Phone Number"
        id="phone"
        type="tel"
        register={register("phone")}
        error={errors.phone}
      />
      <FormCheckbox
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
