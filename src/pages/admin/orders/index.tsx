import { AdminLayout } from '@/components/layouts'
import { OrderInterface, UserInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import useSWR from 'swr'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'total', headerName: 'Total', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? <Chip label="Paid" color="success" variant="outlined" /> : <Chip label="Not Paid" color="error" variant="outlined" />
    },
  },
  { field: 'products', headerName: 'Products', width: 100 },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
  {
    field: 'see-order',
    headerName: 'See Order',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Link href={`/admin/orders/${row.id}`} sx={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer">
          View Order
        </Link>
      )
    },
  },
]

export default function OrdersPage() {
  const { data, error, isLoading } = useSWR<OrderInterface[]>('/api/admin/orders')

  if (error) {
    return (
      <AdminLayout title="Orders | Teslo">
        <Typography variant="h1" component="h1">
          Orders
        </Typography>
        <Typography variant="h2" sx={{ mt: 2 }}>
          Oops! Something went wrong.
        </Typography>
      </AdminLayout>
    )
  }

  if (isLoading) {
    return (
      <AdminLayout title="Orders | Teslo">
        <Typography variant="h1" component="h1">
          Orders
        </Typography>
        <Typography variant="h2" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </AdminLayout>
    )
  }

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as UserInterface).email,
    name: (order.user as UserInterface).name,
    total: order.total,
    isPaid: order.isPaid,
    products: order.numberOfProducts,
    createdAt: order.createdAt,
  }))

  return (
    <AdminLayout title="Orders | Teslo">
      <Typography variant="h1" component="h1">
        Orders
      </Typography>
      <Box sx={{ mt: 4, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25]}
          getRowId={(row) => row.id}
        />
      </Box>
    </AdminLayout>
  )
}
