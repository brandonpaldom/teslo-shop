import Typography from '@mui/material/Typography'
import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { initialData } from '@/database/products'

export default function HomePage() {
  return (
    <ShopLayout title="The Official Teslo Shop | Teslo" description="The Official Teslo Shop | Teslo">
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mt: 2, mb: 4 }}>
        All products
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  )
}
