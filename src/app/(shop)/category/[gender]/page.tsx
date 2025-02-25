export const revalidate = 60;

import { getProductsPagination } from "@/actions/products";
import { NoProducts, Pagination, ProductsGrid, Title } from "@/components";
import { ProductGender } from "@prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

const allowedGenders = ["men", "women", "kids"] as const;
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
    return <NoProducts />;
  }

  return (
    <>
      <Title title={gender} subtitle="All products" className="mb-10" />
      <ProductsGrid products={products} />
      <div className="mt-10 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
