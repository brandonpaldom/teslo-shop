'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { handleError } from '@/utils';

// Configure Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL as string);

export const uploadProfileImageBase64 = async (base64Image: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: 'User not authenticated.',
    };
  }

  try {
    if (!base64Image?.startsWith('data:image/')) {
      return {
        success: false,
        message: 'Invalid image data provided.',
      };
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'teslo-shop/profiles',
      transformation: [
        { width: 500, height: 500, crop: 'fill', gravity: 'face' },
      ],
    });

    // Update user record with new image URL
    await prisma.user.update({
      where: { id: userId },
      data: { image: result.secure_url },
    });

    revalidatePath('/profile');

    return {
      success: true,
      imageUrl: result.secure_url,
    };
  } catch (error) {
    return handleError(
      error,
      'Failed to upload profile image. Please try again.'
    );
  }
};
