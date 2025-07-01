export const revalidate = 60;

import { redirect } from 'next/navigation';
import { getProductsPagination } from '@/actions/products';
import { Pagination, ProductsGrid, Title } from '@/components';

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
    redirect('/');
  }

  return (
    <>
      <Title className="mb-10" subtitle="All products" title="Shop" />
      <ProductsGrid products={products} />
      <div className="mt-10 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
