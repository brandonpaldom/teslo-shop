import { ProductInterface } from '@/interfaces'
import Grid from '@mui/material/Grid'
import { FC } from 'react'

import { ProductCard } from './'

interface Props {
  products: ProductInterface[]
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  )
}
