import { getProductBySlug, getProductCategories } from "@/actions/products";
import { ProductForm, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getProductCategories(),
  ]);

  if (!product && slug !== "create") {
    redirect("/admin/products");
  }

  const title = slug === "create" ? "Create Product" : "Edit Product";

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6">
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
