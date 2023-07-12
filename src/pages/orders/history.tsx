import { ShopLayout } from '@/components/layouts'
import { dbOrders } from '@/database'
import { OrderInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      const chip = params.row.paid ? <Chip label="Paid" variant="outlined" color="success" /> : <Chip label="Not paid" variant="outlined" color="warning" />
      return chip
    },
  },
  {
    field: 'see-order',
    headerName: 'See Order',
    width: 150,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      const link = (
        <Link href={`/orders/${params.row.orderId}`} style={{ textDecoration: 'underline' }}>
          Go to order
        </Link>
      )
      return link
    },
  },
]

interface Props {
  orders: OrderInterface[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    status: order.isPaid,
    name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }))

  return (
    <ShopLayout title="Teslo | Order History" description="Teslo | Order History">
      <Box>
        <Typography variant="h1" component="h1">
          Oder History
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default HistoryPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    }
  }

  const orders = await dbOrders.getOrdersByUserId(session.user._id)

  return {
    props: {
      orders,
    },
  }
}
