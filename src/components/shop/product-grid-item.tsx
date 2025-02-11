"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductGridItem({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative">
        <div className="overflow-hidden">
          <Image
            src={`/products/${currentImage}`}
            alt={product.name}
            width={1080}
            height={1080}
            onMouseEnter={() => setCurrentImage(product.images[1])}
            onMouseLeave={() => setCurrentImage(product.images[0])}
          />
        </div>
        {product.stock === 0 && (
          <div className="absolute left-0 top-0 bg-black/50 px-2 py-1 text-[0.875rem] font-semibold text-white backdrop-blur-sm">
            Out of Stock
          </div>
        )}
      </Link>
      <Link href={`/product/${product.slug}`}>
        <h3 className="mt-1 text-[0.875rem] font-bold transition-colors duration-300 hover:text-primary">
          {product.name}
        </h3>
      </Link>
      <p className="text-[0.875rem] font-semibold">${product.price}</p>
    </div>
  );
}
