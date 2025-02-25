import { ProductSize } from "./shared";

export interface ProductToOrder {
  id: string;
  quantity: number;
  size: ProductSize;
}
