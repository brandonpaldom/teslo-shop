import type { Product } from '@/interfaces';
import ProductGridItem from './product-grid-item';

interface Props {
  products: Product[];
}

export default function ProductsGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:gap-12">
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
}
