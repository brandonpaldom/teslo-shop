import { FC, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ProductInterface } from '@/interfaces'
import Link from 'next/link'

interface Props {
  product: ProductInterface
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0]
  }, [isHovered, product.images])

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link href="/product/slug" prefetch={false}>
          <CardActionArea>
            <CardMedia component="img" image={`/products/${productImage}`} alt={product.title} />
          </CardActionArea>
        </Link>
      </Card>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          ${product.price}
        </Typography>
      </Box>
    </Grid>
  )
}
