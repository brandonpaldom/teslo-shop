import { ShopLayout } from '@/components/layouts'
import { AuthContext } from '@/context'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function EmptyCartPage() {
  const router = useRouter()
  const { isLoggedIn } = useContext(AuthContext)

  const navigateTo = (url: string) => {
    router.push(url)
  }

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
            <Button variant="contained" color="secondary" fullWidth onClick={() => navigateTo('/')}>
              Continue Shopping
            </Button>
            {!isLoggedIn && (
              <Button variant="outlined" fullWidth onClick={() => navigateTo('/auth/login')}>
                Sign In
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </ShopLayout>
  )
}
