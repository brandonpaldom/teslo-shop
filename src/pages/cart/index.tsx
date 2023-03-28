import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CartContext } from '@/context'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { jwt } from '@/utils'

export default function CartPage() {
  const { isLoaded, cart } = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty')
    }
  }, [isLoaded, cart, router])

  if (!isLoaded || cart.length === 0) {
    return null
  }

  return (
    <ShopLayout title="Teslo | Your Cart" description="Teslo | Your Cart">
      <Box sx={{ maxWidth: { xs: '480px', lg: '1024px' }, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Cart
        </Typography>
        <Grid container spacing={4} sx={{ mt: 0 }}>
          <Grid item xs={12} lg={7}>
            <CartList editMode />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Card sx={{ border: '1px solid #f5f5f5' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h2" component="h2">
                  Order Summary
                </Typography>
                <OrderSummary />
                <Box sx={{ mt: 4 }}>
                  <Button variant="contained" color="secondary" fullWidth href="/checkout/address">
                    Checkout
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  )
}
