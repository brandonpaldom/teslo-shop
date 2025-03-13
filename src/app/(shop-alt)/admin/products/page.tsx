import { getProductsPagination } from "@/actions/products";
import { Pagination, ProductsTable, Title } from "@/components";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams.page
    ? Number(resolvedSearchParams.page)
    : 1;

  const { products, totalPages } = await getProductsPagination({
    page,
  });

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <div className="flex w-full items-center justify-between">
        <Title title="All Products" />
        <Link href="/admin/product/create" className="btn btn-primary">
          Create Product
        </Link>
      </div>
      <ProductsTable products={products} />
      <div className="mt-10 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
