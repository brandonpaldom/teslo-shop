import { ShopLayout } from '@/components/layouts'
import { ProductSlideshow, SizeSelector } from '@/components/products'
import { ItemCounter } from '@/components/ui'
import { CartContext } from '@/context'
import { dbProducts } from '@/database'
import { CartInterface, ProductInterface, SizesInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

interface Props {
  product: ProductInterface
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter()
  const { addProductToCart } = useContext(CartContext)

  const [cartProduct, setCartProduct] = useState<CartInterface>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = (size: SizesInterface) => {
    setCartProduct((prev) => ({
      ...prev,
      size,
    }))
  }

  const handleUpdateQuantity = (quantity: number) => {
    setCartProduct((prev) => ({
      ...prev,
      quantity,
    }))
  }

  const addToCart = () => {
    if (!cartProduct.size) {
      return
    }

    addProductToCart(cartProduct)
    router.push('/cart')
  }

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
              <ItemCounter currentValue={cartProduct.quantity} updateQuantity={handleUpdateQuantity} maxValue={product.inStock > 5 ? 5 : product.inStock} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Size
              </Typography>
              <SizeSelector
                // selectedSize={product.sizes[1]}
                selectedSize={cartProduct.size}
                sizes={product.sizes}
                handleSelectedSize={selectedSize}
              />
            </Box>
            {product.inStock === 0 ? (
              <Button variant="outlined" color="error" sx={{ mt: 2 }} disabled>
                Out of stock
              </Button>
            ) : (
              <Button variant="contained" color="secondary" sx={{ mt: 2, maxWidth: '320px' }} onClick={addToCart}>
                {cartProduct.size ? 'Add to cart' : 'Select a size'}
              </Button>
            )}
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
    // revalidate: 60 * 60 * 24,
  }
}
