import { ShopLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function EmptyCartPage() {
  return (
    <ShopLayout title="Teslo | Your Cart" description="Teslo | Your Cart">
      <Box sx={{ maxWidth: '1024px', margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Cart
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 6, maxWidth: '600px', margin: { xs: '0 auto', md: '0' } }}>
          <Typography variant="h2" component="h2" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            Your cart is empty.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Button variant="contained" color="secondary" fullWidth>
              Continue Shopping
            </Button>
            <Button variant="outlined" fullWidth>
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </ShopLayout>
  )
}
