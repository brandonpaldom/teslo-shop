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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: ProductSize;
  image: string;
}

export type ProductSize = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ProductGender = "men" | "women" | "kids";
export type ProductCategory =
  | "tee"
  | "hoodie"
  | "sweatshirt"
  | "jacket"
  | "hat"
  | "beanie"
  | "socks";
