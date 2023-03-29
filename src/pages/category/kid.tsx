import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { ProductsLoader } from '@/components/ui'
import { useProducts } from '@/hooks'
import Typography from '@mui/material/Typography'

export default function MenPage() {
  const { products, isLoading } = useProducts(`/products?gender=kid`)

  return (
    <ShopLayout title={`Teslo | Apparel Kids`} description={`Teslo | Apparel Kids`}>
      <Typography variant="h1" component="h1">
        Kids
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mt: 2, mb: 4 }}>
        Best Sellers
      </Typography>
      {isLoading ? <ProductsLoader /> : <ProductList products={products} />}
    </ShopLayout>
  )
}
