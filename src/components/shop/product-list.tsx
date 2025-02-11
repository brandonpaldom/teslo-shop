import { CartItem } from "@/interfaces";
import ProductListItem from "./product-list-item";

interface Props {
  products: CartItem[];
  onRemove?: (id: string, size: string) => void;
  showRemove?: boolean;
}

export default function ProductList({ products, showRemove, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {products.map((product, index) => (
        <ProductListItem
          key={index}
          product={product}
          onRemove={onRemove}
          showRemove={showRemove}
        />
      ))}
    </div>
  );
}
