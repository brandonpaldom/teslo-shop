import { prisma } from "../../lib/prisma";
import { createProducts } from "./createProducts";
import { createProductCategories } from "./createProductCategory";

async function deleteAll() {
  if (process.env.NODE_ENV === "production") {
    console.error("Seeding is not allowed in production.");
    process.exit(1);
  }

  console.log("Deleting all data...");

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
}

async function main() {
  console.log("Start seeding...");
  await deleteAll();
  console.log("Creating product categories...");
  await createProductCategories();
  console.log("Creating products...");
  await createProducts();
}

main()
  .then(async () => {
    console.log("Seed completed successfully!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(`Error during seed: ${e.message}`);
    await prisma.$disconnect();
    process.exit(1);
  });
