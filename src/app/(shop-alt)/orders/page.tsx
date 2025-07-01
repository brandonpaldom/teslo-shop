export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { getOrderByUser } from '@/actions/order';
import { EmptyState, OrdersTable, Title } from '@/components';
import type { UserOrder } from '@/interfaces';

export default async function OrdersPage() {
  const { success, data } = await getOrderByUser();

  const orders = data as UserOrder[];

  if (!success) {
    redirect('/auth/login');
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        message="No orders have been placed yet."
        title="No Orders Found"
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
