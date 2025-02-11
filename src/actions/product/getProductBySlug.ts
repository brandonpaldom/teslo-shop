"use server";

import { prisma } from "@/lib/prisma";

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
    console.error("Error fetching product by slug:", error);
    throw new Error("Error fetching product by slug");
  }
};
