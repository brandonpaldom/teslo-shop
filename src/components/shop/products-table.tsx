import { Product } from "@/interfaces";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import ImagePlaceholder from "../ui/image-placeholder";
import EmptyState from "../ui/empty-state";

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        message="You can create a new product by clicking the button above."
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
              key={product.id}
              className="border-b bg-white hover:bg-neutral-50"
            >
              <td className="px-6 py-4">
                <ImagePlaceholder
                  src={(product.images?.[0] as string) || ""}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </td>
              <td className="px-6 py-4">
                <Link
                  href={`/product/${product.slug}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {product.name}
                </Link>
              </td>
              <td className="px-6 py-4">
                {formatCurrency(Number(product.price))}
              </td>
              <td className="px-6 py-4">{product.gender}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{product.size.join(", ")}</td>
              <td className="px-6 py-4">
                <Link
                  href={`/admin/product/${product.slug}`}
                  className="font-semibold text-primary hover:underline"
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
