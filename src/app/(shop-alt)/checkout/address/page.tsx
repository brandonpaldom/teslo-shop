import { getAddress, getCountries } from "@/actions/shop";
import { auth } from "@/auth";
import { AddressForm, Title } from "@/components";
import { redirect } from "next/navigation";

export default async function AddressPage() {
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const address = (await getAddress(session.user.id)) || {};

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Shipping" />
      <AddressForm countries={countries} addressData={address} />
    </div>
  );
}
