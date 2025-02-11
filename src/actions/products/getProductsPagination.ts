"use server";

import { prisma } from "@/lib/prisma";
import { ProductGender } from "@prisma/client";

interface PaginationParams {
  page?: number;
  limit?: number;
  gender?: ProductGender;
}

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
    console.error("Error fetching paginated products:", error);
    throw new Error("Failed to fetch products");
  }
};
