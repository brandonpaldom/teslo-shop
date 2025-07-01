'use client';

import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import type { UserOrder } from '@/interfaces';
import OrdersTable from '../shop/orders-table';
import Button from '../ui/button';

interface ProfileOrdersProps {
  orders: UserOrder[];
}

export default function ProfileOrders({ orders }: ProfileOrdersProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow-sm">
        <div className="py-12">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-neutral-100 p-3">
              <IoCartOutline className="h-8 w-8 text-neutral-500" />
            </div>
          </div>
          <h3 className="mb-2 font-medium text-lg text-neutral-900">
            No orders yet
          </h3>
          <p className="mb-6 text-neutral-500">
            When you place orders, they will appear here for you to track.
          </p>
          <Link href="/" passHref>
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-medium text-lg text-neutral-900">
        Order History
      </h2>
      <OrdersTable orders={orders} />
    </div>
  );
}
