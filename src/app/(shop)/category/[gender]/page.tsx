export const revalidate = 60;

import type { ProductGender } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getProductsPagination } from '@/actions/products';
import { EmptyState, Pagination, ProductsGrid, Title } from '@/components';

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

const allowedGenders = ['men', 'women', 'kids'] as const;
type AllowedGender = (typeof allowedGenders)[number];

export default async function CategoryPage({ params, searchParams }: Props) {
  const gender = (await params).gender;

  if (!allowedGenders.includes(gender as AllowedGender)) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? Number(resolvedSearchParams.page)
    : 1;

  const { products, totalPages } = await getProductsPagination({
    page,
    gender: gender as ProductGender,
  });

  if (!products.length) {
    return (
      <EmptyState message="Try a different filter" title="No products found" />
    );
  }

  return (
    <>
      <Title className="mb-10" subtitle="All products" title={gender} />
      <ProductsGrid products={products} />
      <div className="mt-10 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
