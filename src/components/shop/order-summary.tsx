"use client";

import Link from "next/link";
import Divider from "../ui/divider";
import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  totalItems: number;
  subtotal: number;
  salesTax: number;
  totalDue: number;
  shipping?: number | string;
  shippingAddress: {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    zipCode: string;
    city: string;
    state: string;
    country?: string;
    countryId?: string;
    phone: string;
    orderId: string;
  };
  billingAddress: {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    zipCode: string;
    city: string;
    state: string;
    country?: string;
    countryId?: string;
    phone: string;
    orderId: string;
  };
  isEditable?: boolean;
}

export default function OrderSummary({
  totalItems,
  subtotal,
  salesTax,
  totalDue,
  shipping = "Free",
  shippingAddress,
  billingAddress,
  isEditable = false,
}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <h2 className="text-[1.25rem] font-semibold">
        Order Summary ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h2>
      <div className="flex flex-col gap-2 text-[0.875rem]">
        <div className="flex justify-between">
          <p>Shipping Address</p>
          {isEditable && (
            <Link href="/checkout/address" className="underline">
              Edit
            </Link>
          )}
        </div>
        <div className="font-semibold">
          <p>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p>
            {shippingAddress.address} {shippingAddress.apartment}
          </p>
          <p>
            {shippingAddress.city}, {shippingAddress.state}{" "}
            {shippingAddress.zipCode}
          </p>
          <p>{shippingAddress.country || shippingAddress.countryId}</p>
          <p>{shippingAddress.phone}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[0.875rem]">
        <div className="flex justify-between">
          <p>Billing Address</p>
          {isEditable && (
            <Link href="/checkout/address" className="underline">
              Edit
            </Link>
          )}
        </div>
        <div className="font-semibold">
          <p>
            {billingAddress.firstName} {billingAddress.lastName}
          </p>
          <p>
            {billingAddress.address} {billingAddress.apartment}
          </p>
          <p>
            {billingAddress.city}, {billingAddress.state}{" "}
            {billingAddress.zipCode}
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2 text-[0.875rem]">
        <div className="flex justify-between">
          <h2>Subtotal</h2>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>
            {typeof shipping === "number" ? formatCurrency(shipping) : shipping}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Sales Tax</p>
          <p>{formatCurrency(salesTax)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <h2 className="text-[1.25rem]">Total Due</h2>
          <p>{formatCurrency(totalDue)}</p>
        </div>
      </div>
    </>
  );
}
