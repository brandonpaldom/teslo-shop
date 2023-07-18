import { DashboardCard } from '@/components/admin/DashboardCard'
import { AdminLayout } from '@/components/layouts'
import { DashboardData } from '@/interfaces'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR<DashboardData>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000,
  })

  const [refreshInterval, setRefreshInterval] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshInterval((prev) => (prev > 0 ? prev - 1 : 30))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (error || isLoading) {
    return (
      <AdminLayout title="Dashboard | Teslo">
        <Typography variant="h1" component="h1">
          Dashboard
        </Typography>
        <Typography variant="h2" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </AdminLayout>
    )
  }

  const { numberOfOrders, paidOrders, notPaidOrders, numberOfCustomers, numberOfProducts, productsOutOfStock, productsWithLowStock } = data

  return (
    <AdminLayout title="Dashboard | Teslo">
      <Typography variant="h1" component="h1">
        Dashboard
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <DashboardCard title="Total orders" subtitle={numberOfOrders} />
          <DashboardCard title="Paid orders" subtitle={paidOrders} />
          <DashboardCard title="Pending orders" subtitle={notPaidOrders} />
          <DashboardCard title="Customers" subtitle={numberOfCustomers} />
          <DashboardCard title="Products" subtitle={numberOfProducts} />
          <DashboardCard title="Out of stock" subtitle={productsOutOfStock} />
          <DashboardCard title="Low stock" subtitle={productsWithLowStock} />
          <DashboardCard title="Update on" subtitle={refreshInterval} />
        </Grid>
      </Box>
    </AdminLayout>
  )
}
