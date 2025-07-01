'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/interfaces';
import { formatCurrency } from '@/utils';
import ImagePlaceholder from '../ui/image-placeholder';

interface Props {
  product: Product;
}

export default function ProductGridItem({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(
    (product.images?.[0] ?? '') as string
  );

  return (
    <div className="flex flex-col">
      <Link className="relative" href={`/product/${product.slug}`}>
        <div className="overflow-hidden">
          <ImagePlaceholder
            alt={product.name}
            height={1080}
            onMouseEnter={() =>
              setCurrentImage((product.images?.[1] ?? '') as string)
            }
            onMouseLeave={() =>
              setCurrentImage((product.images?.[0] ?? '') as string)
            }
            src={currentImage}
            width={1080}
          />
        </div>
        {product.stock === 0 && (
          <div className="absolute top-0 left-0 bg-black/50 px-2 py-1 font-semibold text-[0.875rem] text-white backdrop-blur-sm">
            Out of Stock
          </div>
        )}
      </Link>
      <Link href={`/product/${product.slug}`}>
        <h3 className="mt-1 font-bold text-[0.875rem] transition-colors duration-300 hover:text-primary">
          {product.name}
        </h3>
      </Link>
      <p className="font-semibold text-[0.875rem]">
        {formatCurrency(product.price as number)}
      </p>
    </div>
  );
}
