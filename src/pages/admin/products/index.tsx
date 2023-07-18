import { AdminLayout } from '@/components/layouts'
import { ProductInterface } from '@/interfaces'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import useSWR from 'swr'

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Link href={`/product/${row.slug}`} target="_black" rel="noreferrer">
          <CardMedia component="img" image={row.images} />
        </Link>
      )
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    renderCell: ({ row }: GridRenderCellParams) => (
      <Link href={`/admin/products/${row.slug}`} target="_black" rel="noreferrer">
        {row.title}
      </Link>
    ),
  },
  { field: 'gender', headerName: 'Gender', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'inStock', headerName: 'In Stock', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'size', headerName: 'Size', width: 150 },
]

export default function ProductsPage() {
  const { data, error, isLoading } = useSWR<ProductInterface[]>('/api/admin/products')

  if (error || isLoading) {
    return (
      <AdminLayout title="Users | Teslo">
        <Typography variant="h1" component="h1">
          Users
        </Typography>
        <Typography variant="h2" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </AdminLayout>
    )
  }

  const rows = data!.map((product) => ({
    id: product._id,
    images: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    size: product.sizes.join(', '),
    slug: product.slug,
  }))

  return (
    <AdminLayout title="Products | Teslo">
      <Typography variant="h1">Products</Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
        <Button variant="contained" color="secondary" href="/admin/products/new" startIcon={<AddIcon />}>
          Add Product
        </Button>
      </Box>
      <Box sx={{ mt: 4, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} autoHeight initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[5, 10, 25]} />
      </Box>
    </AdminLayout>
  )
}
