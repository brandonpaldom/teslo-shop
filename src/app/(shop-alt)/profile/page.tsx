import { redirect } from 'next/navigation';
import { getCountries } from '@/actions/checkout';
import { getOrderByUser } from '@/actions/order';
import { getUserProfile } from '@/actions/profile';
import { auth } from '@/auth';
import { Title } from '@/components';
import {
  ProfileAddress,
  ProfileHeader,
  ProfileInfo,
  ProfileOrders,
  ProfileSecurity,
} from '@/components/profile';
import type { Country } from '@/interfaces';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  // Fetch user profile data
  const { success: profileSuccess, data: profileData } = await getUserProfile();

  if (!profileSuccess) {
    redirect('/auth/login');
  }

  // Fetch user orders
  const { success: ordersSuccess, data: ordersData } = await getOrderByUser();

  // Fetch countries for address form
  const { success: countriesSuccess, data: countriesData } =
    await getCountries();

  // Ensure countries is always an array
  let countries: Country[] = [];
  if (countriesSuccess && countriesData) {
    countries = Array.isArray(countriesData) ? countriesData : [];
  }

  // Ensure orders match the UserOrder interface
  interface UserOrder {
    id: string;
    isPaid: boolean;
    OrderAddress: {
      firstName: string;
      lastName: string;
    };
  }

  let orders: UserOrder[] = [];
  if (ordersSuccess && ordersData && Array.isArray(ordersData)) {
    orders = ordersData.map((order) => ({
      id: order.id,
      isPaid: order.isPaid,
      OrderAddress: order.OrderAddress || {
        firstName: '',
        lastName: '',
      },
    }));
  }

  const user = profileData || {
    id: '',
    name: '',
    email: '',
    role: 'user',
    image: null,
    Address: null,
  };
  // Convert the address to match the expected interface
  const address = user.Address
    ? {
        ...user.Address,
        apartment: user.Address.apartment || undefined,
        country: user.Address.country?.id,
      }
    : null;

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title subtitle="Manage your account information" title="My Profile" />

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Header with Avatar */}
        <ProfileHeader user={user} />

        {/* Profile sections */}
        <div className="w-full">
          <ProfileInfo user={user} />
          <div className="mt-8">
            <ProfileOrders orders={orders} />
          </div>
          <div className="mt-8">
            <ProfileAddress
              address={address}
              countries={countries}
              userId={user.id}
            />
          </div>
          <div className="mt-8">
            <ProfileSecurity />
          </div>
        </div>
      </div>
    </div>
  );
}
