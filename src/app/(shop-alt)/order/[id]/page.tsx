import { getOrderById } from "@/actions/order";
import {
  Divider,
  OrderSummary,
  PaymentStatus,
  PayPalButton,
  ProductList,
  Title,
} from "@/components";
import { Address, ProductSize } from "@/interfaces";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const id = (await params).id;
  const { success, data } = await getOrderById(id);

  if (!success || !data) {
    redirect("/");
  }

  const order = data;
  const address = order.OrderAddress as Address;

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title={`Order #${id}`} />
      <Divider className="lg:hidden" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-24">
        <div className="flex flex-col gap-6">
          <PaymentStatus isPaid={order.isPaid} />
          <ProductList
            products={order.OrderItem.map((item) => ({
              id: item.product.slug,
              name: item.product.name,
              price: item.price,
              quantity: item.quantity,
              size: item.size as ProductSize,
              image: item.product.images[0]?.url,
            }))}
          />
        </div>
        <Divider className="lg:hidden" />
        <div className="lg:card flex h-fit flex-col gap-4">
          <OrderSummary
            totalItems={order.totalItems}
            subtotal={order.subtotal}
            salesTax={order.salesTax}
            totalDue={order.totalDue}
            shippingAddress={address}
            billingAddress={address}
          />
          {order.isPaid ? (
            <PaymentStatus isPaid={order.isPaid} />
          ) : (
            <PayPalButton amount={order.totalDue} orderId={order.id} />
          )}
        </div>
      </div>
    </div>
  );
}
