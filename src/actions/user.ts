"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/utils";
import { revalidatePath } from "next/cache";

export const getAllUser = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return handleError(error, "Failed to fetch users. Please try again.");
  }
};

export const updateUserRole = async (
  userId: string,
  role: "admin" | "user",
) => {
  const session = await auth();
  const adminId = session?.user.id;

  if (!adminId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return handleError(error, "Failed to update user role. Please try again.");
  }
};
