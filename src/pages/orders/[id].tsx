import { tesloApi } from '@/api'
import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { dbOrders } from '@/database'
import { OrderInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export type OrderResponseBody = {
  id: string
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED' | 'CREATED'
}

interface Props {
  order: OrderInterface
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter()
  const { _id, orderItems, isPaid, shippingAddress } = order
  const [isPaying, setIsPaying] = useState(false)

  const onOrderSuccess = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('Something went wrong')
    }

    setIsPaying(true)

    try {
      const { data } = await tesloApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      })

      router.reload()
    } catch (error) {
      setIsPaying(false)
      console.log(error)
      alert('Something went wrong')
    }
  }

  return (
    <ShopLayout title="Teslo | Checkout" description="Teslo | Your Cart">
      <Box sx={{ maxWidth: { xs: '480px', lg: '1024px' }, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Order: {_id}
        </Typography>
        {isPaid ? (
          <Chip label="Successfully paid" variant="outlined" color="success" sx={{ mt: 2 }} />
        ) : (
          <Chip label="Pending payment" variant="outlined" color="warning" sx={{ mt: 2 }} />
        )}
        <Grid container spacing={4} sx={{ mt: 0 }}>
          <Grid item xs={12} lg={7}>
            <CartList products={order.orderItems} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Card sx={{ border: '1px solid #f5f5f5' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h2" component="h2">
                  Order Summary ({orderItems.length} item{orderItems.length > 1 && 's'})
                </Typography>
                <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography fontWeight={600}>Shipping address</Typography>
                      <Typography>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </Typography>
                      <Typography>{shippingAddress.address}</Typography>
                      <Typography>
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </Typography>
                      <Typography>United States</Typography>
                      <Typography>+{shippingAddress.phone}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <OrderSummary orderValues={{ numberOfProducts: order.numberOfProducts, subTotal: order.subTotal, tax: order.tax, total: order.total }} />
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Typography variant="h1" component="h1">
                    Pay
                  </Typography>
                  <Box sx={{ display: isPaying ? 'flex' : 'none', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                  <Box sx={{ display: isPaying ? 'none' : 'flex', flexDirection: 'column' }}>
                    {order.isPaid ? (
                      <Chip label="Successfully paid" variant="outlined" color="success" sx={{ width: '100%' }} />
                    ) : (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: `${order.total}`,
                                },
                              },
                            ],
                          })
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            onOrderSuccess(details)
                          })
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  )
}

export default OrderPage

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    }
  }

  const order = await dbOrders.getOrderById(id as string)

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    }
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    }
  }

  return {
    props: {
      order,
    },
  }
}
