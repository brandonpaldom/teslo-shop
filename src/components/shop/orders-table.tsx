import clsx from 'clsx';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import type { UserOrder } from '@/interfaces';

interface Props {
  orders: UserOrder[];
  basePath?: string;
}

export default function OrdersTable({ orders, basePath = '/order' }: Props) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-max text-left text-[0.875rem] text-neutral-500">
        <thead className="bg-neutral-50 text-neutral-700">
          <tr>
            <th className="px-6 py-3">Order #</th>
            <th className="px-6 py-3">Full name</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="border-neutral-200 border-b" key={order.id}>
              <td className="px-6 py-4">{order.id}</td>
              <td className="px-6 py-4">
                {order.OrderAddress.firstName} {order.OrderAddress.lastName}
              </td>
              <td className="px-6 py-4">
                <span
                  className={clsx(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-[0.75rem]',
                    order.isPaid
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  )}
                >
                  <IoCardOutline className="mr-1 h-3.5 w-3.5" />
                  {order.isPaid ? 'Order paid' : 'Pending payment'}
                </span>
              </td>
              <td className="px-6 py-4">
                <Link
                  className="font-semibold text-primary hover:underline"
                  href={`${basePath}/${order.id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
