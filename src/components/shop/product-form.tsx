"use client";

import {
  Category,
  Product,
  ProductGender,
  ProductImage,
  ProductSize,
} from "@/interfaces";
import Input from "../ui/form/input";
import TextArea from "../ui/form/textarea";
import Select from "../ui/form/select";
import Button from "../ui/button";
import FileInput from "../ui/form/file";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductData, productSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { createOrUpdateProduct, deleteImage } from "@/actions/product";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImagePlaceholder from "../ui/image-placeholder";

interface Props {
  product?: Partial<Product> | null;
  categories: Category[];
}

const EMPTY_PRODUCT: Product = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  size: [],
  slug: "",
  tags: [],
  gender: "men",
  images: [],
};

const genders: ProductGender[] = ["men", "women", "kids"];
const sizes: ProductSize[] = ["S", "M", "L", "XL", "XXL", "XXXL"];

export default function ProductForm({ product, categories }: Props) {
  const router = useRouter();
  const productToUse = product ?? EMPTY_PRODUCT;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch,
  } = useForm<ProductData>({
    defaultValues: {
      ...productToUse,
      tags: productToUse.tags?.join(", "),
      size: productToUse.size || [],
      images: undefined,
      price: typeof productToUse.price === "number" ? productToUse.price : 0,
    },
    resolver: zodResolver(productSchema),
  });

  watch("size");

  const onSizeClick = (size: ProductSize) => {
    const currentSizes = new Set(getValues("size"));
    if (currentSizes.has(size)) {
      currentSizes.delete(size);
    } else {
      currentSizes.add(size);
    }
    setValue("size", Array.from(currentSizes));
  };

  const onSubmit: SubmitHandler<ProductData> = async (data: ProductData) => {
    const formData = new FormData();
    const { images, ...productToSubmit } = data;

    if (productToUse.id) {
      formData.append("id", productToUse.id);
    }
    formData.append("name", productToSubmit.name);
    formData.append("slug", productToSubmit.slug);
    formData.append("description", productToSubmit.description);
    formData.append("price", productToSubmit.price.toString());
    formData.append("stock", productToSubmit.stock.toString());
    formData.append("size", productToSubmit.size.join(","));
    formData.append("tags", productToSubmit.tags ?? "");
    formData.append("categoryId", productToSubmit.categoryId);
    formData.append("gender", productToSubmit.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { success, product: updatedProduct } =
      await createOrUpdateProduct(formData);

    if (!success) {
      console.log("Error creating/updating product");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-1 gap-6"
    >
      <Input
        label="Product Name"
        id="name"
        register={register("name")}
        error={errors.name}
      />
      <Input
        label="Slug"
        id="slug"
        register={register("slug")}
        error={errors.slug}
      />
      <TextArea
        label="Description"
        id="description"
        register={register("description")}
        error={errors.description}
      />
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Price"
          id="price"
          register={register("price")}
          error={errors.price}
        />
        <Input
          label="Stock"
          id="stock"
          register={register("stock")}
          error={errors.stock}
        />
      </div>
      <Input
        label="Tags"
        id="tags"
        register={register("tags")}
        error={errors.tags}
      />
      <Select
        label="Gender"
        id="gender"
        register={register("gender")}
        error={errors.gender}
      >
        {genders.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </Select>
      <Select
        label="Category"
        id="categoryId"
        register={register("categoryId")}
        error={errors.categoryId}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <div className="flex flex-col gap-2">
        <span className="text-[0.875rem] font-semibold text-neutral-500">
          Sizes
        </span>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeClick(size)}
              className={clsx("btn", {
                "btn-primary": getValues("size").includes(size),
                "btn-secondary": !getValues("size").includes(size),
              })}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <FileInput
        label="Upload Image"
        id="images"
        multiple
        accept="image/jpg, image/png"
        register={register("images")}
        error={errors.images}
      />
      <div className="grid grid-cols-3 gap-6">
        {(productToUse.images as ProductImage[])?.map((image) => (
          <div key={image.id} className="flex flex-col items-start gap-2">
            <ImagePlaceholder
              src={image.url}
              alt=""
              width={200}
              height={200}
              className="h-32 w-full rounded-lg object-cover"
            />
            <Button
              type="button"
              size="sm"
              variant="danger"
              onClick={() => deleteImage(image.id, image.url)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Button size="lg" disabled={isSubmitting}>
        {productToUse.id ? "Update Product" : "Create Product"}
      </Button>
      <Link href="/admin/products" className="btn-lg btn-secondary">
        View Products
      </Link>
    </form>
  );
}
