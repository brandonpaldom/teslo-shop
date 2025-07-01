export const revalidate = 86_400;

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/actions/products';
import { ProductMobileSlideshow, ProductSlideshow } from '@/components';
import AddToCart from '@/components/shop/add-to-cart';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProductData(slug: string) {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductData(slug);

  return {
    title: `${product.name} | Teslo`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Teslo`,
      description: product.description,
      images: [`/products/${product.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug;
  const product = await getProductData(slug);

  if (!product) {
    notFound();
  }

  const images = product.images.map((image) => image.url);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-12 xl:px-12 xl:py-12">
      <div className="col-span-1 xl:col-span-2">
        <ProductMobileSlideshow
          className="block xl:hidden"
          images={images}
          title={product.name}
        />
        <ProductSlideshow
          className="hidden xl:block"
          images={images}
          title={product.name}
        />
      </div>
      <div className="flex flex-col items-start px-6 xl:px-0">
        <h1 className="font-semibold text-[1.5rem] leading-tight xl:text-[2rem]">
          {product.name}
        </h1>
        <p className="mt-2 font-semibold text-[1.25rem] leading-none">
          ${product.price}
        </p>
        <AddToCart product={product} />
        <div className="mt-6">
          <h2 className="font-semibold text-[0.875rem] leading-none">
            Description
          </h2>
          <p className="mt-2 font-medium text-[0.875rem] text-neutral-500">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
