"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/utils";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const getUserProfile = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        Address: {
          include: {
            country: true,
          },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return handleError(error, "Failed to fetch user profile. Please try again.");
  }
};

export const updateUserProfile = async (formData: FormData) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const validatedData = profileSchema.parse({ name, email });

    // Check if email is already in use by another user
    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== userId) {
        return {
          success: false,
          message: "Email is already in use.",
        };
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: validatedData.name,
        email: validatedData.email,
      },
    });

    revalidatePath("/profile");

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return {
        success: false,
        message: "Validation error",
        fieldErrors
      };
    }
    
    return handleError(error, "Failed to update profile. Please try again.");
  }
};

export const changePassword = async (formData: FormData) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const validatedData = passwordSchema.parse({ 
      currentPassword, 
      newPassword, 
      confirmPassword 
    });

    // Verify current password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const isPasswordValid = await bcryptjs.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Current password is incorrect.",
      };
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(validatedData.newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "Password updated successfully.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return {
        success: false,
        message: "Validation error",
        fieldErrors
      };
    }
    
    return handleError(error, "Failed to change password. Please try again.");
  }
};

// Configure Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL as string);

export const uploadProfileImage = async (formData: FormData) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    // Log for debugging
    console.log("Server action: uploadProfileImage called");
    
    const file = formData.get("image");
    console.log("File received:", file ? "yes" : "no", typeof file);
    
    if (!file || !(file instanceof File)) {
      console.error("Invalid file object received:", file);
      return {
        success: false,
        message: "No valid image provided.",
      };
    }

    console.log("Processing file:", file.name, file.type, file.size);

    // Get the file buffer and convert to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    
    // Upload to Cloudinary
    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64}`, 
      {
        folder: "teslo-shop/profiles",
        transformation: [
          { width: 500, height: 500, crop: "fill", gravity: "face" }
        ],
      }
    );
    
    console.log("Cloudinary upload successful:", result.secure_url);

    // Update user record with new image URL
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: result.secure_url },
    });
    
    console.log("User record updated with new image URL");

    revalidatePath("/profile");

    return {
      success: true,
      imageUrl: result.secure_url,
    };
  } catch (error) {
    console.error("Profile image upload error:", error);
    return handleError(error, "Failed to upload profile image. Please try again.");
  }
};

// Keep this for backward compatibility
export const updateUserImage = async (imageUrl: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    revalidatePath("/profile");

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    return handleError(error, "Failed to update profile image. Please try again.");
  }
};