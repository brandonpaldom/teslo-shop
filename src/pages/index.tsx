import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { ProductsLoader } from '@/components/ui'
import { useProducts } from '@/hooks'
import Typography from '@mui/material/Typography'

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
