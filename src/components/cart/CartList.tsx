import { CartContext } from '@/context'
import { CartInterface, OrderInterface, OrderItemInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useContext } from 'react'

import { ItemCounter } from '../ui'

interface Props {
  editMode?: boolean
  products?: OrderItemInterface[]
}

export const CartList: FC<Props> = ({ editMode = false, products }) => {
  const { cart, updateProductQuantity, removeProductFromCart } = useContext(CartContext)

  const handleUpdateQuantity = (product: CartInterface, newQuantity: number) => {
    updateProductQuantity({ ...product, quantity: newQuantity })
  }

  const productsInCart = products ? products : cart

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {productsInCart.map((product) => (
        <Grid container key={product.slug + product.size} spacing={0}>
          <Grid item xs={3}>
            <Link href={`/product/${product.slug}`}>
              <Image src={product.image} alt={product.title} width={80} height={80} />
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight={600} noWrap>
              {product.title}
            </Typography>
            <Typography>
              Size:{' '}
              <Typography sx={{ fontWeight: 600 }} component="span">
                {product.size}
              </Typography>
            </Typography>
            {editMode ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={5}
                  updateQuantity={(value) => {
                    handleUpdateQuantity(product as CartInterface, value)
                  }}
                />
                <Button color="secondary" size="small" onClick={() => removeProductFromCart(product as CartInterface)}>
                  Remove
                </Button>
              </Box>
            ) : (
              <Typography sx={{ fontWeight: 600 }}>
                {product.quantity} {product.quantity > 1 ? 'products' : 'product'}
              </Typography>
            )}
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography fontWeight={600}>${product.price}</Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}
