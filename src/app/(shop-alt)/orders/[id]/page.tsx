import {
  Divider,
  OrderSummary,
  PaymentStatus,
  ProductList,
  Title,
} from "@/components";
import { initialData } from "@/seed/data/seed";

interface Props {
  params: Promise<{ id: string }>;
}

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

export default async function OrderPage({ params }: Props) {
  const id = (await params).id;

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title={`Order #${id}`} />
      <Divider className="lg:hidden" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-24">
        <div className="flex flex-col gap-6">
          <PaymentStatus isPaid />
          <ProductList products={productsInCart} />
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
          />
          <PaymentStatus isPaid />
        </div>
      </div>
    </div>
  );
}
