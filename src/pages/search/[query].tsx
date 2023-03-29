import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { dbProducts } from '@/database'
import { ProductInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { GetServerSideProps, NextPage } from 'next'

interface Props {
  products: ProductInterface[]
  foundProducts: boolean
  query: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title="Teslo | Shop Search" description="Teslo | Shop Search">
      <Typography variant="h1" component="h1">
        Results for{' '}
        <Typography variant="h1" component="span" sx={{ fontWeight: 400 }}>
          {query}
        </Typography>
      </Typography>
      {!foundProducts && (
        <Typography variant="h2" component="h2" sx={{ mt: 2 }}>
          No Results Found. You may also be interested in these products:
        </Typography>
      )}
      <Box sx={{ mt: 4 }}>
        <ProductList products={products} />
      </Box>
    </ShopLayout>
  )
}

export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  let products = await dbProducts.getProductsByTerm(query)
  const foundProducts = products.length > 0

  if (!foundProducts) {
    products = await dbProducts.getProducts()
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  }
}
