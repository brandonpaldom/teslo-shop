'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { createOrUpdateProduct, deleteImage } from '@/actions/product';
import type {
  Category,
  Product,
  ProductGender,
  ProductImage,
  ProductSize,
} from '@/interfaces';
import { type ProductData, productSchema } from '@/schemas';
import Button from '../ui/button';
import FileInput from '../ui/form/file';
import Input from '../ui/form/input';
import Select from '../ui/form/select';
import TextArea from '../ui/form/textarea';
import ImagePlaceholder from '../ui/image-placeholder';

interface Props {
  product?: Partial<Product> | null;
  categories: Category[];
}

const EMPTY_PRODUCT: Product = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  size: [],
  slug: '',
  tags: [],
  gender: 'men',
  images: [],
};

const genders: ProductGender[] = ['men', 'women', 'kids'];
const sizes: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

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
      tags: productToUse.tags?.join(', '),
      size: productToUse.size || [],
      images: undefined,
      price: typeof productToUse.price === 'number' ? productToUse.price : 0,
    },
    resolver: zodResolver(productSchema),
  });

  watch('size');

  const onSizeClick = (size: ProductSize) => {
    const currentSizes = new Set(getValues('size'));
    if (currentSizes.has(size)) {
      currentSizes.delete(size);
    } else {
      currentSizes.add(size);
    }
    setValue('size', Array.from(currentSizes));
  };

  const onSubmit: SubmitHandler<ProductData> = async (data: ProductData) => {
    const formData = new FormData();
    const { images, ...productToSubmit } = data;

    if (productToUse.id) {
      formData.append('id', productToUse.id);
    }
    formData.append('name', productToSubmit.name);
    formData.append('slug', productToSubmit.slug);
    formData.append('description', productToSubmit.description);
    formData.append('price', productToSubmit.price.toString());
    formData.append('stock', productToSubmit.stock.toString());
    formData.append('size', productToSubmit.size.join(','));
    formData.append('tags', productToSubmit.tags ?? '');
    formData.append('categoryId', productToSubmit.categoryId);
    formData.append('gender', productToSubmit.gender);

    if (images) {
      for (const image of images) {
        formData.append('images', image);
      }
    }

    const { success, product: updatedProduct } =
      await createOrUpdateProduct(formData);

    if (!success) {
      // Error handling could be added here if needed
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      className="grid w-full grid-cols-1 gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        error={errors.name}
        id="name"
        label="Product Name"
        register={register('name')}
      />
      <Input
        error={errors.slug}
        id="slug"
        label="Slug"
        register={register('slug')}
      />
      <TextArea
        error={errors.description}
        id="description"
        label="Description"
        register={register('description')}
      />
      <div className="grid grid-cols-2 gap-6">
        <Input
          error={errors.price}
          id="price"
          label="Price"
          register={register('price')}
        />
        <Input
          error={errors.stock}
          id="stock"
          label="Stock"
          register={register('stock')}
        />
      </div>
      <Input
        error={errors.tags}
        id="tags"
        label="Tags"
        register={register('tags')}
      />
      <Select
        error={errors.gender}
        id="gender"
        label="Gender"
        register={register('gender')}
      >
        {genders.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </Select>
      <Select
        error={errors.categoryId}
        id="categoryId"
        label="Category"
        register={register('categoryId')}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[0.875rem] text-neutral-500">
          Sizes
        </span>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              className={clsx('btn', {
                'btn-primary': getValues('size').includes(size),
                'btn-secondary': !getValues('size').includes(size),
              })}
              key={size}
              onClick={() => onSizeClick(size)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <FileInput
        accept="image/jpg, image/png"
        error={errors.images}
        id="images"
        label="Upload Image"
        multiple
        register={register('images')}
      />
      <div className="grid grid-cols-3 gap-6">
        {(productToUse.images as ProductImage[])?.map((image) => (
          <div className="flex flex-col items-start gap-2" key={image.id}>
            <ImagePlaceholder
              alt=""
              className="h-32 w-full rounded-lg object-cover"
              height={200}
              src={image.url}
              width={200}
            />
            <Button
              onClick={() => deleteImage(image.id, image.url)}
              size="sm"
              type="button"
              variant="danger"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Button disabled={isSubmitting} size="lg">
        {productToUse.id ? 'Update Product' : 'Create Product'}
      </Button>
      <Link className="btn-lg btn-secondary" href="/admin/products">
        View Products
      </Link>
    </form>
  );
}
