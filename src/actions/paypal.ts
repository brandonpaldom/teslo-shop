"use server";

import { PayPalTransactionResponse } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/utils";
import { revalidatePath } from "next/cache";

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL || "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8",
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(PAYPAL_OAUTH_URL, requestOptions).then((res) =>
      res.json(),
    );
    return response.access_token;
  } catch (error) {
    console.error("Error fetching PayPal bearer token:", error);
    return null;
  }
};

const verifyPayment = async (
  orderId: string,
  authToken: string,
): Promise<PayPalTransactionResponse> => {
  const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const url = `${PAYPAL_ORDERS_URL}/${orderId}`;

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("PayPal payment verification failed.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying PayPal payment:", error);
    throw new Error("Failed to verify PayPal payment.");
  }
};

export const checkPaypalPayment = async (orderId: string) => {
  const authToken = await getPaypalBearerToken();
  if (!authToken) {
    throw new Error("Failed to get PayPal bearer token.");
  }
  const paymentResponse = await verifyPayment(orderId, authToken);
  if (!paymentResponse) {
    throw new Error("Failed to verify PayPal payment.");
  }
  const { status, purchase_units } = paymentResponse;
  const { invoice_id } = purchase_units[0];
  if (status !== "COMPLETED") {
    throw new Error("Payment not completed.");
  }

  try {
    await prisma.order.update({
      where: {
        id: invoice_id,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${invoice_id}`);

    return {
      success: true,
      message: "Payment verified successfully.",
    };
  } catch (error) {
    return handleError(error, "Failed to check PayPal payment.");
  }
};
