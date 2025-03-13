"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/utils";

export const getOrderById = async (id: string) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        success: false,
        message: "User not authenticated.",
      };
    }

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                name: true,
                slug: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return {
        success: false,
        message: "Order not found.",
      };
    }

    if (session?.user.role !== "admin" && order.userId !== userId) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const processedOrder = {
      ...order,
      subtotal: order.subtotal.toNumber(),
      salesTax: order.salesTax.toNumber(),
      totalDue: order.totalDue.toNumber(),
      OrderItem: order.OrderItem.map((item) => ({
        ...item,
        price: item.price.toNumber(),
      })),
    };

    return {
      success: true,
      data: processedOrder,
    };
  } catch (error) {
    return handleError(error, "Failed to fetch order. Please try again.");
  }
};

export const getOrderByUser = async () => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        success: false,
        message: "User not authenticated.",
      };
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        isPaid: true,
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    return handleError(error, "Failed to fetch orders. Please try again.");
  }
};

export const getAllOrders = async () => {
  try {
    const session = await auth();

    if (session?.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        isPaid: true,
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    return handleError(error, "Failed to fetch orders. Please try again.");
  }
};
