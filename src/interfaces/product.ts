import { Decimal } from "@prisma/client/runtime/library";
import type { ProductGender, ProductSize } from "./shared";

export interface Product {
  id?: string;
  name: string;
  price: Decimal | number;
  description: string;
  stock: number;
  slug: string;
  size: ProductSize[];
  gender: ProductGender;
  images?: ProductImage[] | string[];
  tags: string[];
}

export interface ProductImage {
  id: string;
  url: string;
}
