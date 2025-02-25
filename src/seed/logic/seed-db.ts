import { prisma } from "../../lib/prisma";
import { createProducts } from "./createProducts";
import { createProductCategories } from "./createProductCategory";
import { createUsers } from "./createUsers";
import { createCountries } from "./createCountries";

async function deleteAll() {
  if (process.env.NODE_ENV === "production") {
    console.error("Seeding is not allowed in production.");
    process.exit(1);
  }

  console.log("Deleting all data...");
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
}

async function main() {
  console.log("Start seeding...");
  await deleteAll();
  console.log("Creating users...");
  await createUsers();
  console.log("Creating products...");
  await createProducts();
  console.log("Creating product categories...");
  await createProductCategories();
  console.log("Creating countries...");
  await createCountries();
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
