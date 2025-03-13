"use server";

import { Product, ProductSize } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL as string);

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload(`data:image/jpg;base64,${base64}`, {
            folder: "teslo-shop",
            use_filename: true,
          })
          .then((result) => result.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error("Error uploading images:", error);
    return null;
  }
};

export const createOrUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsedData = productSchema.safeParse({
    ...data,
    price: Number(data.price),
    stock: Number(data.stock),
  });

  if (!parsedData.success) {
    console.log(parsedData.error);
    return {
      success: false,
    };
  }

  const product = parsedData.data;
  const { id, ...productData } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagList = productData.tags
        ? productData.tags.split(",").map((tag) => tag.trim().toLowerCase())
        : [];

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...productData,
            size: {
              set: productData.size as ProductSize[],
            },
            tags: {
              set: tagList,
            },
            images: undefined,
          },
        });
      } else {
        product = await tx.product.create({
          data: {
            ...productData,
            size: {
              set: productData.size as ProductSize[],
            },
            tags: {
              set: tagList,
            },
          },
        });
      }

      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);

        if (!images) {
          throw new Error("Error uploading images");
        }

        await prisma.productImage.createMany({
          data: images.map((url) => ({
            url: url as string,
            productId: product.id!,
          })),
        });
      }

      return {
        product,
      };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      product: {
        ...prismaTx.product,
        price: Number(prismaTx.product.price),
      },
    };
  } catch (error) {
    console.error("Error creating/updating product:", error);
    return {
      success: false,
    };
  }
};

export const deleteImage = async (imageId: string, imageUrl: string) => {
  if (!imageUrl) {
    return {
      success: false,
      message: "You can't delete images from file system",
    };
  }

  const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(`teslo-shop/${publicId}`);

    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    const { slug } = deletedImage.product;
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${slug}`);
    revalidatePath(`/product/${slug}`);
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      message: "Error deleting image",
    };
  }
};
