import type { CartItem } from '@/interfaces';
import ProductListItem from './product-list-item';

interface Props {
  products: CartItem[];
  onRemove?: (id: string, size: string) => void;
  showRemove?: boolean;
}

export default function ProductList({ products, showRemove, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {products.map((product) => (
        <ProductListItem
          key={`${product.id}-${product.size}`}
          onRemove={onRemove}
          product={product}
          showRemove={showRemove}
        />
      ))}
    </div>
  );
}
