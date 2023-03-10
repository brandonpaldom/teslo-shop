import { ShopLayout } from '@/components/layouts'
import { ProductsLoader } from '@/components/ui'
import { ProductList } from '@/components/products'
import Typography from '@mui/material/Typography'
import { useProducts } from '@/hooks'

export default function HomePage() {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title="The Official Teslo Shop | Teslo" description="The Official Teslo Shop | Teslo">
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mt: 2, mb: 4 }}>
        All Products
      </Typography>
      {isLoading ? <ProductsLoader /> : <ProductList products={products} />}
    </ShopLayout>
  )
}
