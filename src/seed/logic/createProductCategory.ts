import { prisma } from "../../lib/prisma";
import { initialData } from "../data/seed";

export const createProductCategories = async () => {
  const { categories } = initialData;

  const categoriesData = categories.map((category) => ({
    name: category.name,
  }));

  await prisma.productCategory.createMany({
    data: categoriesData,
  });
};
