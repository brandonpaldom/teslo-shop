import { Divider, OrderSummary, ProductList, Title } from "@/components";
import { initialData } from "@/seed/data/seed";
import Link from "next/link";

const productsInCart = initialData.products.slice(0, 3);

const shippingAddress = {
  name: "Brandon Palmeros",
  addressLine1: "3941 J St",
  addressLine2: "Sacramento, CA 95819-3628",
  country: "United States",
  phone: "+12015550123",
};

const billingAddress = {
  name: "Brandon Palmeros",
  addressLine1: "3941 J St",
  addressLine2: "Sacramento, CA 95819-3628",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Review and Pay" />
      <Divider className="lg:hidden" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-24">
        <div className="flex flex-col gap-6">
          <ProductList products={productsInCart} />
          <Link href="/cart" className="text-[0.875rem] underline">
            Edit Cart
          </Link>
        </div>
        <Divider className="lg:hidden" />
        <div className="lg:card flex h-fit flex-col gap-4">
          <OrderSummary
            itemsCount={3}
            subtotal="$120"
            shipping="Free"
            salesTax="$10.50"
            totalDue="$130.50"
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            isEditable
          />
          <p className="text-[0.75rem]">
            By continuing, I understand and agree to the{" "}
            <span className="underline">
              General Terms and Conditions of Online Accessories Sales
            </span>
            , <span className="underline">Terms of Use</span>, and{" "}
            <span className="underline">Privacy Notice</span>.
          </p>
          <Link href="/orders/123" className="btn-lg btn-primary">
            Place Order
          </Link>
        </div>
      </div>
    </div>
  );
}
