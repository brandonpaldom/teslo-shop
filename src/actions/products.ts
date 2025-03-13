"use server";

import type { ProductGender } from "@/interfaces";
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
            id: true,
          },
        },
      },
      where: {
        slug,
      },
    });

    if (!product) {
      return null;
    }

    const price = product.price ? product.price.toNumber() : 0;

    return {
      ...product,
      price,
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

export const getProductCategories = async () => {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (error) {
    console.error("Failed to fetch product categories:", error);
    throw new Error("Failed to fetch product categories. Please try again.");
  }
};
