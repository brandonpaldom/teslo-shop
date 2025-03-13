import { prisma } from "../../lib/prisma";
import { initialData } from "../data/seed";

export const createProducts = async () => {
  const { products } = initialData;
  const categories = await prisma.productCategory.findMany();

  const categoriesMap = categories.reduce(
    (acc, category) => {
      acc[category.name] = category.id;
      return acc;
    },
    {} as Record<string, string>,
  );

  for (const product of products) {
    const { images, category, ...productData } = product;

    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        categoryId: categoriesMap[category],
        size: productData.size.map((size) => size),
        gender: productData.gender,
      },
    });

    await prisma.productImage.createMany({
      data: images.map((url) => ({
        url,
        productId: createdProduct.id,
      })),
    });
  }
};
