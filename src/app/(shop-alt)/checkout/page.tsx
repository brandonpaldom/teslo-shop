'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { processOrder } from '@/actions/checkout';
import { Divider, OrderSummary, ProductList, Title } from '@/components';
import { useAddressStore, useCartStore } from '@/stores';

export default function CheckoutPage() {
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cartItems = useCartStore((state) => state.cartItems);
  const address = useAddressStore((state) => state.address);
  const clearCart = useCartStore((state) => state.clearCart);
  const { totalItems, subtotal, salesTax, totalDue } = useCartStore(
    useShallow((state) => state.getSummary())
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0 && isClient && !isNavigating) {
      router.replace('/cart/empty');
    }
  }, [cartItems, isClient, router, isNavigating]);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    setError(null);

    const itemsToOrder = cartItems.map((item) => ({
      id: item.id,
      size: item.size,
      quantity: item.quantity,
    }));

    const response = await processOrder(itemsToOrder, address);

    if (!response.success) {
      setIsPlacingOrder(false);
      setError(response.message ?? 'An unknown error occurred');
      return;
    }

    const orderId = response.data?.order.id;

    clearCart();
    setIsNavigating(true);
    router.replace(`/order/${orderId}`);

    setTimeout(() => {
      setIsPlacingOrder(false);
    }, 2000);
  };

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Review and Pay" />
      <Divider className="lg:hidden" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-24">
        <div className="flex flex-col gap-6">
          <ProductList products={cartItems} />
          <Link className="text-[0.875rem] underline" href="/cart">
            Edit Cart
          </Link>
        </div>
        <Divider className="lg:hidden" />
        <div className="lg:card flex h-fit flex-col gap-4">
          <OrderSummary
            billingAddress={address}
            isEditable
            salesTax={salesTax}
            shippingAddress={address}
            subtotal={subtotal}
            totalDue={totalDue}
            totalItems={totalItems}
          />
          <p className="text-[0.75rem]">
            By continuing, I understand and agree to the{' '}
            <span className="underline">
              General Terms and Conditions of Online Accessories Sales
            </span>
            , <span className="underline">Terms of Use</span>, and{' '}
            <span className="underline">Privacy Notice</span>.
          </p>
          {error && <p className="text-[0.75rem] text-red-500">{error}</p>}
          <button
            className="btn-lg btn-primary"
            disabled={isPlacingOrder}
            onClick={handlePlaceOrder}
            type="button"
          >
            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
