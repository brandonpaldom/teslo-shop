export const revalidate = 60 * 60 * 24;

import { getProductBySlug } from "@/actions/products";
import { ProductMobileSlideshow, ProductSlideshow } from "@/components";
import AddToCart from "@/components/shop/add-to-cart";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const product = await getProductData((await params).slug);

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
  const product = await getProductData((await params).slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-12 xl:px-12 xl:py-12">
      <div className="col-span-1 xl:col-span-2">
        <ProductMobileSlideshow
          title={product.name}
          images={product.images}
          className="block xl:hidden"
        />
        <ProductSlideshow
          title={product.name}
          images={product.images}
          className="hidden xl:block"
        />
      </div>
      <div className="flex flex-col items-start px-6 xl:px-0">
        <h1 className="text-[1.5rem] font-semibold leading-tight xl:text-[2rem]">
          {product.name}
        </h1>
        <p className="mt-2 text-[1.25rem] font-semibold leading-none">
          ${product.price}
        </p>
        <AddToCart product={product} />
        <div className="mt-6">
          <h2 className="text-[0.875rem] font-semibold leading-none">
            Description
          </h2>
          <p className="mt-2 text-[0.875rem] font-medium text-neutral-500">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
