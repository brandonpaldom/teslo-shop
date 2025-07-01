import Link from 'next/link';
import type { Product } from '@/interfaces';
import { formatCurrency } from '@/utils';
import EmptyState from '../ui/empty-state';
import ImagePlaceholder from '../ui/image-placeholder';

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        message="You can create a new product by clicking the button above."
        title="No products found"
      />
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-max text-left text-[0.875rem] text-neutral-500">
        <thead className="bg-neutral-50 text-neutral-700">
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Sizes</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              className="border-b bg-white hover:bg-neutral-50"
              key={product.id}
            >
              <td className="px-6 py-4">
                <ImagePlaceholder
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                  height={48}
                  src={(product.images?.[0] as string) || ''}
                  width={48}
                />
              </td>
              <td className="px-6 py-4">
                <Link
                  className="font-semibold text-primary hover:underline"
                  href={`/product/${product.slug}`}
                >
                  {product.name}
                </Link>
              </td>
              <td className="px-6 py-4">
                {formatCurrency(Number(product.price))}
              </td>
              <td className="px-6 py-4">{product.gender}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{product.size.join(', ')}</td>
              <td className="px-6 py-4">
                <Link
                  className="font-semibold text-primary hover:underline"
                  href={`/admin/product/${product.slug}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
