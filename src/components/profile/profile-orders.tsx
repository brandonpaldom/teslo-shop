"use client";

import { UserOrder } from "@/interfaces";
import OrdersTable from "../shop/orders-table";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import Button from "../ui/button";

interface ProfileOrdersProps {
  orders: UserOrder[];
}

export default function ProfileOrders({ orders }: ProfileOrdersProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white p-6 shadow-sm rounded-lg text-center">
        <div className="py-12">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-neutral-100 p-3">
              <IoCartOutline className="h-8 w-8 text-neutral-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No orders yet</h3>
          <p className="text-neutral-500 mb-6">
            When you place orders, they will appear here for you to track.
          </p>
          <Link href="/" passHref>
            <Button variant="primary">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-lg font-medium text-neutral-900 mb-4">Order History</h2>
      <OrdersTable orders={orders} />
    </div>
  );
}