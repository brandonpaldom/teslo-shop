import { ProductGender, ProductSize } from "./shared";

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  slug: string;
  size: ProductSize[];
  gender: ProductGender;
  // category: ProductCategory;
  images: string[];
  tags: string[];
}
