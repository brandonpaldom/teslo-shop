import { FC } from 'react'
import Image from 'next/image'
import { ItemCounter } from '../ui'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { initialData } from '@/database/products'

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

interface Props {
  editMode?: boolean
}

export const CartList: FC<Props> = ({ editMode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {productsInCart.map((product) => (
        <Grid container key={product.slug} spacing={0}>
          <Grid item xs={3}>
            <Image src={`/products/${product.images[0]}`} alt={product.title} width={80} height={80} />
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight={600} noWrap>
              {product.title}
            </Typography>
            <Typography>
              Talla
              <Typography sx={{ fontWeight: 600 }} component="span">
                {' '}
                M
              </Typography>
            </Typography>
            {editMode ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <ItemCounter />
                <Button color="secondary" size="small">
                  Remove
                </Button>
              </Box>
            ) : (
              <Typography sx={{ fontWeight: 600 }}>1</Typography>
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
