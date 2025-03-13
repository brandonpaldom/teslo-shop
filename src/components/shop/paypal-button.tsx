"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { setOrderPaid } from "@/actions/checkout";
import { checkPaypalPayment } from "@/actions/paypal";

interface Props {
  orderId: string;
  amount: number;
}

export default function PayPalButton({ orderId, amount }: Props) {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundToTwoDecimals = (amount: number) => {
    return Math.round(amount * 100) / 100;
  };

  if (isPending) {
    return (
      <div className="flex w-full animate-pulse flex-col gap-4">
        <div className="h-10 rounded bg-neutral-300"></div>
        <div className="h-10 rounded bg-neutral-300"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: `${roundToTwoDecimals(amount)}`.toString(),
          },
        },
      ],
    });

    const { success } = await setOrderPaid(orderId, transactionId);

    if (!success) {
      throw new Error("Failed to process order. Please try again.");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const order = await actions.order?.capture();
    if (!order) return;
    await checkPaypalPayment(order.id as string);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
}
