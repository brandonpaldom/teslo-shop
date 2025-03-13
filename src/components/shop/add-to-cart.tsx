"use client";

import QuantitySelector from "./quantity-selector";
import SizeSelector from "./size-selector";
import Button from "../ui/button";
import type {
  CartItem,
  Product,
  ProductImage,
  ProductSize,
} from "@/interfaces";
import { useState } from "react";
import { useCartStore } from "@/stores";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function AddToCart({ product }: Props) {
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = () => {
    const productToAdd: CartItem = {
      id: product.id ?? "",
      name: product.name,
      price: product.price as number,
      quantity,
      size: selectedSize as ProductSize,
      image:
        product.images && product.images.length > 0
          ? typeof product.images[0] === "string"
            ? product.images[0]
            : (product.images[0] as ProductImage).url
          : undefined,
    };

    addItemToCart(productToAdd);
    setSelectedSize(undefined);
    setQuantity(1);
    setIsInCart(true);
  };

  return (
    <>
      <div className="mt-6">
        <p className="mb-2 text-[0.875rem] font-semibold leading-none">Size</p>
        <SizeSelector
          selectedSize={selectedSize}
          availableSizes={product.size}
          stockQuantity={product.stock}
          onSizeSelection={setSelectedSize}
        />
      </div>
      {product.stock !== 0 ? (
        <div className="my-6">
          <p className="mb-2 text-[0.875rem] font-semibold leading-none">
            Quantity
          </p>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            maxQuantity={product.stock}
          />
        </div>
      ) : (
        <p className="mb-2 mt-6 text-[0.875rem] font-semibold">
          This item is out of stock
        </p>
      )}
      {product.stock !== 0 && (
        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="lg"
          className="w-full sm:w-[320px]"
          disabled={!selectedSize || product.stock === 0}
        >
          Add to Cart
        </Button>
      )}
      {isInCart && (
        <Link
          href="/cart"
          className="btn-lg btn-secondary mt-4 w-full text-sm font-semibold sm:w-[320px]"
        >
          Go to Cart
        </Link>
      )}
    </>
  );
}
