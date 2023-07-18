import { ProductInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'

interface Props {
  product: ProductInterface
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0]
  }, [isHovered, product.images])

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link href={`/product/${product.slug}`} prefetch={false}>
          <CardActionArea>
            {product.inStock === 0 && <Chip label="Out of Stock" color="primary" sx={{ position: 'absolute', top: 10, left: 10 }} />}
            <CardMedia component="img" image={productImage} alt={product.title} onLoad={() => setIsImageLoaded(true)} />
          </CardActionArea>
        </Link>
      </Card>
      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'false' }}>
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
