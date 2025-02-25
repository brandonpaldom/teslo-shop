import { getAddress, getCountries } from "@/actions/checkout";
import { auth } from "@/auth";
import { AddressForm, Title } from "@/components";
import { redirect } from "next/navigation";

export default async function AddressPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const countriesResponse = await getCountries();
  const countries = countriesResponse.data;
  const addressResponse = await getAddress(session.user.id);
  const address = addressResponse.data;

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Shipping" />
      <AddressForm countries={countries} addressData={address} />
    </div>
  );
}
