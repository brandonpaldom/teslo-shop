import Link from "next/link";
import Divider from "../ui/divider";

interface Props {
  itemsCount: number;
  subtotal: string;
  shipping: string;
  salesTax: string;
  totalDue: string;
  shippingAddress: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    phone: string;
  };
  billingAddress: {
    name: string;
    addressLine1: string;
    addressLine2: string;
  };
  isEditable?: boolean;
}

export default function OrderSummary({
  itemsCount,
  subtotal,
  shipping,
  salesTax,
  totalDue,
  shippingAddress,
  billingAddress,
  isEditable = false,
}: Props) {
  return (
    <>
      <h2 className="text-[1.25rem] font-semibold">
        Order Summary ({itemsCount} items)
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
          <p>{shippingAddress.name}</p>
          <p>{shippingAddress.addressLine1}</p>
          <p>{shippingAddress.addressLine2}</p>
          <p>{shippingAddress.country}</p>
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
          <p>{billingAddress.name}</p>
          <p>{billingAddress.addressLine1}</p>
          <p>{billingAddress.addressLine2}</p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2 text-[0.875rem]">
        <div className="flex justify-between">
          <h2>Subtotal</h2>
          <p>{subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>{shipping}</p>
        </div>
        <div className="flex justify-between">
          <p>Sales Tax</p>
          <p>{salesTax}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <h2 className="text-[1.25rem]">Total Due</h2>
          <p>{totalDue}</p>
        </div>
      </div>
    </>
  );
}
