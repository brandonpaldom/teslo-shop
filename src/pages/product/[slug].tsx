import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ShopLayout } from '@/components/layouts'
import { ProductSlideshow, SizeSelector } from '@/components/products'
import { ItemCounter } from '@/components/ui'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ProductInterface } from '@/interfaces'
import { dbProducts } from '@/database'

interface Props {
  product: ProductInterface
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={`${product.title} | Teslo`} description={`${product.title} | Teslo`}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="h2" component="h2" sx={{ mt: 1, fontWeight: 700 }}>
              ${product.price}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Quantity
              </Typography>
              <ItemCounter />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Size
              </Typography>
              <SizeSelector
                // selectedSize={product.sizes[1]}
                sizes={product.sizes}
              />
            </Box>
            <Button variant="contained" color="secondary" sx={{ mt: 2, maxWidth: '320px' }}>
              Add to cart
            </Button>
            {/* <Button variant="outlined" color="error" sx={{ mt: 2 }} disabled>
              Out of stock
            </Button> */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Description
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
  const productsSlugs = await dbProducts.getProductsSlugs()

  return {
    paths: productsSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  }
}
