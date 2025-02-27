import { prisma } from "../../lib/prisma";
import { initialData } from "../data/seed";

export const createUsers = async () => {
  const { users } = initialData;

  await prisma.user.createMany({
    data: users,
  });
};
