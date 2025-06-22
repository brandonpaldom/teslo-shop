"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/utils";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL as string);

export const uploadProfileImageBase64 = async (base64Image: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  try {
    console.log("Server action: uploadProfileImageBase64 called");
    
    if (!base64Image || !base64Image.startsWith('data:image/')) {
      console.error("Invalid base64 image data");
      return {
        success: false,
        message: "Invalid image data provided.",
      };
    }

    // Upload to Cloudinary
    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "teslo-shop/profiles",
      transformation: [
        { width: 500, height: 500, crop: "fill", gravity: "face" }
      ],
    });
    
    console.log("Cloudinary upload successful:", result.secure_url);

    // Update user record with new image URL
    await prisma.user.update({
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