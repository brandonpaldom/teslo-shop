'use client';

import Link from 'next/link';
import { useState } from 'react';
import type {
  CartItem,
  Product,
  ProductImage,
  ProductSize,
} from '@/interfaces';
import { useCartStore } from '@/stores';
import Button from '../ui/button';
import QuantitySelector from './quantity-selector';
import SizeSelector from './size-selector';

interface Props {
  product: Product;
}

export default function AddToCart({ product }: Props) {
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = () => {
    // Get the product image
    let productImage: string | undefined;
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (typeof firstImage === 'string') {
        productImage = firstImage;
      } else {
        productImage = (firstImage as ProductImage).url;
      }
    }

    const productToAdd: CartItem = {
      id: product.id ?? '',
      name: product.name,
      price: product.price as number,
      quantity,
      size: selectedSize as ProductSize,
      image: productImage,
    };

    addItemToCart(productToAdd);
    setSelectedSize(undefined);
    setQuantity(1);
    setIsInCart(true);
  };

  return (
    <>
      <div className="mt-6">
        <p className="mb-2 font-semibold text-[0.875rem] leading-none">Size</p>
        <SizeSelector
          availableSizes={product.size}
          onSizeSelection={setSelectedSize}
          selectedSize={selectedSize}
          stockQuantity={product.stock}
        />
      </div>
      {product.stock !== 0 ? (
        <div className="my-6">
          <p className="mb-2 font-semibold text-[0.875rem] leading-none">
            Quantity
          </p>
          <QuantitySelector
            maxQuantity={product.stock}
            onQuantityChange={setQuantity}
            quantity={quantity}
          />
        </div>
      ) : (
        <p className="mt-6 mb-2 font-semibold text-[0.875rem]">
          This item is out of stock
        </p>
      )}
      {product.stock !== 0 && (
        <Button
          className="w-full sm:w-[320px]"
          disabled={!selectedSize || product.stock === 0}
          onClick={handleAddToCart}
          size="lg"
          variant="primary"
        >
          Add to Cart
        </Button>
      )}
      {isInCart && (
        <Link
          className="btn-lg btn-secondary mt-4 w-full font-semibold text-sm sm:w-[320px]"
          href="/cart"
        >
          Go to Cart
        </Link>
      )}
    </>
  );
}
