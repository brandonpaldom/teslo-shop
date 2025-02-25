"use server";

import { auth } from "@/auth";
import {
  Address,
  Country,
  Order,
  OrderAddress,
  Product,
  ProductToOrder,
} from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { handleError, Response } from "@/utils";

export const getCountries = async (): Promise<Response<Country[]>> => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      data: countries,
    };
  } catch (error) {
    return handleError(error, "Failed to fetch countries. Please try again.");
  }
};

export const createAddress = async (
  address: Address,
  userId: string,
): Promise<Response<Address>> => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    if (!newAddress.success) {
      throw new Error(newAddress.message);
    }
    return {
      success: true,
      data: newAddress.data,
    };
  } catch (error) {
    return handleError(
      error,
      "Failed to save address. Please check your data and try again.",
    );
  }
};

const createOrReplaceAddress = async (
  address: Address,
  userId: string,
): Promise<Response<Address>> => {
  try {
    const existingAddress = await prisma.address.findUnique({
      where: {
        userId,
      },
    });

    const addressData = {
      userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      apartment: address.apartment,
      zipCode: address.zipCode,
      city: address.city,
      state: address.state,
      countryId: address.country,
      phone: address.phone,
    };

    let result;
    if (existingAddress) {
      result = await prisma.address.update({
        where: {
          userId,
        },
        data: addressData,
      });
    } else {
      result = await prisma.address.create({
        data: addressData,
      });
    }

    return {
      success: true,
      data: {
        ...result,
        country: result.countryId,
        apartment: result.apartment || "",
      },
    };
  } catch (error) {
    return handleError(error, "Failed to save address. Please try again.");
  }
};

export const removeAddress = async (
  userId: string,
): Promise<Response<boolean>> => {
  try {
    await prisma.address.delete({
      where: {
        userId,
      },
    });
    return {
      success: true,
      data: true,
    };
  } catch (error) {
    return handleError(error, "Failed to remove address. Please try again.");
  }
};

export const getAddress = async (
  userId: string,
): Promise<Response<Address>> => {
  try {
    const address = await prisma.address.findUnique({
      where: { userId },
    });

    if (!address) {
      return {
        success: false,
        message: "Address not found",
      };
    }

    const { countryId, apartment, ...rest } = address;
    return {
      success: true,
      data: {
        ...rest,
        country: countryId,
        apartment: apartment || "",
      },
    };
  } catch (error) {
    return handleError(error, "Failed to fetch address. Please try again.");
  }
};

export const processOrder = async (
  productsToOrder: ProductToOrder[],
  address: Address,
): Promise<
  Response<{
    prismaTx: {
      order: Order;
      orderAddress: OrderAddress;
      products: Product[];
    };
  }>
> => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsToOrder.map((item) => item.id),
        },
      },
    });

    const totalItems = productsToOrder.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );

    const subtotal = products.reduce((acc, product) => {
      const quantity =
        productsToOrder.find((item) => item.id === product.id)?.quantity || 0;
      acc += product.price.toNumber() * quantity;
      return acc;
    }, 0);
    const salesTax = subtotal * 0.07;
    const totalDue = subtotal + salesTax;

    try {
      const prismaTx = await prisma.$transaction(async (tx) => {
        const stockUpdates = products.map((product) => {
          const quantity = productsToOrder
            .filter((item) => item.id === product.id)
            .reduce((acc, item) => acc + item.quantity, 0);

          if (quantity === 0) {
            throw new Error("Product quantity is zero");
          }

          return tx.product.update({
            where: {
              id: product.id,
            },
            data: {
              stock: { decrement: quantity },
            },
          });
        });

        const stockUpdateResults = await Promise.all(stockUpdates);

        stockUpdateResults.forEach((result) => {
          if (result.stock < 0) {
            throw new Error("Product out of stock");
          }
        });

        const order = await tx.order.create({
          data: {
            userId,
            totalItems,
            subtotal,
            salesTax,
            totalDue,
            OrderItem: {
              createMany: {
                data: productsToOrder.map((item) => ({
                  productId: item.id,
                  quantity: item.quantity,
                  size: item.size,
                  price:
                    products.find((product) => product.id === item.id)?.price ??
                    0,
                })),
              },
            },
          },
        });

        const processedOrder = {
          ...order,
          salesTax: order.salesTax.toNumber(),
          subtotal: order.subtotal.toNumber(),
          totalDue: order.totalDue.toNumber(),
        };

        const processedProducts = products.map((product) => ({
          ...product,
          price: product.price.toNumber(),
        }));

        const { country, ...rest } = address;
        const orderAddress = await tx.orderAddress.create({
          data: {
            ...rest,
            countryId: country,
            orderId: order.id,
          },
        });

        return {
          order: processedOrder,
          orderAddress,
          products: processedProducts,
        };
      });

      return {
        success: true,
        data: {
          prismaTx,
        },
      };
    } catch (error) {
      return handleError(error, "Failed to process order. Please try again.");
    }
  } catch (error) {
    return handleError(error, "Failed to process order. Please try again.");
  }
};
