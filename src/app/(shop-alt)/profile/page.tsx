import { auth } from "@/auth";
import { getOrderByUser } from "@/actions/order";
import { getUserProfile } from "@/actions/profile";
import { getCountries } from "@/actions/checkout";
import { Title } from "@/components";
import { 
  ProfileHeader, 
  ProfileInfo, 
  ProfileSecurity, 
  ProfileAddress, 
  ProfileOrders 
} from "@/components/profile";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/login");
  }
  
  // Fetch user profile data
  const { success: profileSuccess, data: profileData } = await getUserProfile();
  
  if (!profileSuccess) {
    redirect("/auth/login");
  }
  
  // Fetch user orders
  const { success: ordersSuccess, data: ordersData } = await getOrderByUser();
  
  // Fetch countries for address form
  const { success: countriesSuccess, data: countriesData } = await getCountries();
  
  // Ensure countries is always an array
  const countries = (countriesSuccess && countriesData) ? 
    (Array.isArray(countriesData) ? countriesData : []) : [];
  
  const orders = (ordersSuccess && ordersData) ? 
    (Array.isArray(ordersData) ? ordersData : []) : [];
  
  const user = profileData;
  const address = user.Address || null;

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="My Profile" subtitle="Manage your account information" />
      
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
