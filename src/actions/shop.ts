"use server";

import { Address, ProductGender } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface PaginationParams {
  page?: number;
  limit?: number;
  gender?: ProductGender;
}

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const price = product.price ? product.price.toNumber() : 0;
    const images = product.images?.map((image) => image.url) || [];

    return {
      ...product,
      price,
      images,
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw new Error("Failed to fetch product. Please try again.");
  }
};

export const getProductsPagination = async ({
  page = 1,
  limit = 12,
  gender,
}: PaginationParams) => {
  if (isNaN(Number(page)) || page < 1) {
    page = 1;
  }

  try {
    const products = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        images: {
          take: 2,
          select: {
            url: true,
          },
          orderBy: {
            url: "asc",
          },
        },
      },
      where: {
        gender,
      },
    });

    const formattedProducts = products.map((product) => {
      const price = product.price ? product.price.toNumber() : 0;
      const images = product.images?.map((image) => image.url) || [];

      return {
        ...product,
        price,
        images,
      };
    });

    const totalProducts = await prisma.product.count({
      where: {
        gender,
      },
    });

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      currentPage: page,
      totalPages,
      products: formattedProducts,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products. Please try again.");
  }
};

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return countries;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    throw new Error("Failed to fetch countries. Please try again.");
  }
};

export const createAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return newAddress;
  } catch (error) {
    console.error("Failed to save address:", error);
    throw new Error("Failed to save address. Please try again.");
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
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

    if (existingAddress) {
      const updatedAddress = await prisma.address.update({
        where: {
          userId,
        },
        data: addressData,
      });

      return updatedAddress;
    } else {
      const newAddress = await prisma.address.create({
        data: addressData,
      });

      return newAddress;
    }
  } catch (error) {
    console.error("Database operation failed:", error);
    throw new Error("Failed to save address. Please try again.");
  }
};

export const removeAddress = async (userId: string) => {
  try {
    await prisma.address.delete({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error("Failed to remove address:", error);
    throw new Error("Failed to remove address. Please try again.");
  }
};

export const getAddress = async (userId: string) => {
  try {
    const address = await prisma.address.findUnique({
      where: {
        userId,
      },
    });

    if (!address) {
      return null;
    }

    const { countryId, apartment, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      apartment: apartment || "",
    };
  } catch (error) {
    console.error("Failed to fetch address:", error);
    throw new Error("Failed to fetch address. Please try again.");
  }
};
