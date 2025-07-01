import { redirect } from 'next/navigation';
import { getProductBySlug, getProductCategories } from '@/actions/products';
import { ProductForm, Title } from '@/components';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminProductPage({ params }: Props) {
  const slug = (await params).slug;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getProductCategories(),
  ]);

  if (!product && slug !== 'create') {
    redirect('/admin/products');
  }

  const title = slug === 'create' ? 'Create Product' : 'Edit Product';

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6">
      <Title title={title} />
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
