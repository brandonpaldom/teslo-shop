import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function OrderPage() {
  return (
    <ShopLayout title="Teslo | Checkout" description="Teslo | Your Cart">
      <Box sx={{ maxWidth: { xs: '480px', lg: '1024px' }, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Order: 1
        </Typography>
        {/* <Chip label="Pending payment" variant="outlined" color="warning" sx={{ mt: 2 }} /> */}
        <Chip label="Successfully paid" variant="outlined" color="success" sx={{ mt: 2 }} />
        <Grid container spacing={4} sx={{ mt: 0 }}>
          <Grid item xs={12} lg={7}>
            <CartList />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Card sx={{ border: '1px solid #f5f5f5' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h2" component="h2">
                  Order Summary (3 items)
                </Typography>
                <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography fontWeight={600}>Shipping address</Typography>
                      <Typography>Brandon Palmeros</Typography>
                      <Typography>3533 E Foothill Blvd</Typography>
                      <Typography>Pasadena, CA 91107</Typography>
                      <Typography>United States</Typography>
                      <Typography>+12015550123</Typography>
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
                  <Typography variant="h1" component="h1">
                    Pay
                  </Typography>
                  <Chip label="Successfully paid" variant="outlined" color="success" sx={{ mt: 2 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  )
}
