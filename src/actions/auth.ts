"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import bcryptjs from "bcryptjs";
import { registerBaseSchema } from "@/schemas";

export const login = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLocaleLowerCase().trim(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: "User created successfully.",
    };
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return {
        ok: false,
        message: "An account already exists with this email.",
      };
    }

    console.error("Error in register", error);
    return {
      ok: false,
      message: "Something went wrong.",
    };
  }
};

export const authenticate = async (email: string, password: string) => {
  try {
    const parsed = registerBaseSchema
      .pick({
        email: true,
        password: true,
      })
      .safeParse({ email, password });

    if (!parsed.success) {
      return {
        ok: false,
        message: parsed.error.errors[0].message,
      };
    }

    await signIn("credentials", { email, password });
    return {
      ok: true,
      message: "Successfully authenticated",
    };
  } catch (error) {
    console.error("Error in authenticate", error);
    return {
      ok: false,
      message: "Invalid credentials",
    };
  }
};
