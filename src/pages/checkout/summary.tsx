import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CartContext } from '@/context'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export default function SummaryPage() {
  const router = useRouter()
  const { shipingAddress, numberOfProducts, createOrder } = useContext(CartContext)
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address')
    }
  }, [router])

  const onCreateOrder = async () => {
    setIsPosting(true)
    const { hasError, message } = await createOrder()

    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return
    }

    router.replace(`/orders/${message}`)
  }

  if (!shipingAddress) {
    return null
  }

  return (
    <ShopLayout title="Teslo | Checkout" description="Teslo | Your Cart">
      <Box sx={{ maxWidth: { xs: '480px', lg: '1024px' }, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Review and pay
        </Typography>
        <Grid container spacing={4} sx={{ mt: 0 }}>
          <Grid item xs={12} lg={7}>
            <CartList />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Card sx={{ border: '1px solid #f5f5f5' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h2" component="h2">
                  Order Summary ({numberOfProducts} item{numberOfProducts > 1 && 's'})
                </Typography>
                <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography fontWeight={600}>Shipping address</Typography>
                      <Typography>
                        {shipingAddress?.firstName} {shipingAddress?.lastName}
                      </Typography>
                      <Typography>{shipingAddress?.address}</Typography>
                      {shipingAddress?.addressLine2 && <Typography>{shipingAddress?.addressLine2}</Typography>}
                      <Typography>
                        {shipingAddress?.city}, {shipingAddress?.state} {shipingAddress?.zipCode}
                      </Typography>
                      <Typography>United States</Typography>
                      <Typography>+1{shipingAddress?.phone}</Typography>
                    </Box>
                    <Link href="/checkout/address" style={{ textDecoration: 'underline' }}>
                      <Typography>Edit</Typography>
                    </Link>
                  </Box>
                </Box>
                <Divider />
                <Link href="/checkout/address">
                  <Typography mt={2} sx={{ textDecoration: 'underline', textAlign: 'end' }}>
                    Edit
                  </Typography>
                </Link>
                <OrderSummary />
                <Box sx={{ mt: 4 }}>
                  <Button variant="contained" color="secondary" fullWidth onClick={onCreateOrder} disabled={isPosting}>
                    Place order
                  </Button>
                  {errorMessage && <Chip color="error" label={errorMessage} sx={{ mt: 2 }} />}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  )
}
