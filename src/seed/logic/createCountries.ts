import { prisma } from "../../lib/prisma";
import { initialData } from "../data/seed";

export const createCountries = async () => {
  const { countries } = initialData;

  await prisma.country.createMany({
    data: countries,
  });
};
