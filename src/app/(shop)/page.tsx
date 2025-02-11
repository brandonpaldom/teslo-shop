export const revalidate = 60;

import { getProductsPagination } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams.page
    ? Number(resolvedSearchParams.page)
    : 1;

  const { products, totalPages } = await getProductsPagination({
    page,
  });

  if (!products.length) {
    redirect("/");
  }

  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-10" />
      <ProductsGrid products={products} />
      <div className="mt-10 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
