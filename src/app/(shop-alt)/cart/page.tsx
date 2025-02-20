"use client";

import { Divider, ProductList, Title } from "@/components";
import { useCartStore } from "@/stores";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const { subtotal } = useCartStore(useShallow((state) => state.getSummary()));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0 && isClient) {
      router.replace("/cart/empty");
    }
  }, [cartItems, isClient, router]);

  const handleRemoveItem = (id: string, size: string) => {
    removeItemFromCart(id, size);
  };

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Cart" />
      <Divider className="lg:hidden" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-24">
        <ProductList
          products={cartItems}
          onRemove={handleRemoveItem}
          showRemove
        />
        <Divider className="lg:hidden" />
        <div className="lg:card flex h-fit flex-col gap-4">
          <h2 className="text-[1.25rem] font-semibold">Order Summary</h2>
          <div className="flex justify-between text-[0.875rem]">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between text-[0.875rem]">
            <p>Sales Tax</p>
            <p>Calculated at checkout</p>
          </div>
          <div className="flex justify-between font-semibold">
            <h2 className="text-[1.25rem]">Subtotal</h2>
            {isClient && <p>{formatCurrency(subtotal)}</p>}
          </div>
          <Link href="/checkout/address" className="btn-lg btn-primary">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
