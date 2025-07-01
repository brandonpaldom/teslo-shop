import { redirect } from 'next/navigation';
import { getAddress, getCountries } from '@/actions/checkout';
import { auth } from '@/auth';
import { AddressForm, Title } from '@/components';

export default async function AddressPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  const countriesResponse = await getCountries();
  const countries = countriesResponse.data || [];

  const addressResponse = await getAddress(session.user.id);
  const address = addressResponse.data || {};

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Shipping" />
      <AddressForm addressData={address} countries={countries} />
    </div>
  );
}
