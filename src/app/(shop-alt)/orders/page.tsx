export const dynamic = "force-dynamic";

import { getOrderByUser } from "@/actions/order";
import { EmptyState, OrdersTable, Title } from "@/components";
import { UserOrder } from "@/interfaces";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { success, data } = await getOrderByUser();

  const orders = data as UserOrder[];

  if (!success) {
    redirect("/auth/login");
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Found"
        message="No orders have been placed yet."
      />
    );
  }

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="View Order History" />
      <OrdersTable orders={orders} />
    </div>
  );
}
