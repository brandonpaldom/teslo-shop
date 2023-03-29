import { ShopLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid'
import Link from 'next/link'

const rows: GridRowsProp = [
  { id: 1, paid: true, fullName: 'Alejandro Escobar' },
  { id: 2, paid: false, fullName: 'Antonia Sánchez' },
  { id: 3, paid: true, fullName: 'Carlos López' },
  { id: 4, paid: false, fullName: 'Diego Pérez' },
  { id: 5, paid: true, fullName: 'Enrique Gómez' },
  { id: 6, paid: true, fullName: 'Felipa García' },
  { id: 7, paid: true, fullName: 'Javier Torres' },
  { id: 8, paid: true, fullName: 'Laia Rodríguez' },
  { id: 9, paid: true, fullName: 'Mario Hernández' },
  { id: 10, paid: true, fullName: 'Triana Martínez' },
]

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'fullName', headerName: 'Full Name', width: 150 },
  {
    field: 'paid',
    headerName: 'Paid',
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
        <Link href={`/orders/${params.row.id}`} style={{ textDecoration: 'underline' }}>
          Go to order
        </Link>
      )
      return link
    },
  },
]

export default function HistoryPage() {
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
