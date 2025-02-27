import type { ProductSize } from "./shared";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: ProductSize;
  image: string;
}
