import { tesloApi } from '@/api'
import { AdminLayout } from '@/components/layouts'
import { UserInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function UsersPage() {
  const { data, error, isLoading } = useSWR<UserInterface[]>('/api/admin/users')

  const [users, setUsers] = useState<UserInterface[]>(data || [])

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

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

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }))

  const onRoleChange = async (userId: string, newRole: string) => {
    const prevUsers = users.map((user) => ({ ...user }))

    const newUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, role: newRole }
      }

      return user
    })

    setUsers(newUsers)

    try {
      await tesloApi.put('/admin/users', { id: userId, role: newRole })
    } catch (error) {
      setUsers(prevUsers)
      console.log(error)
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select value={row.role} label="Role" onChange={(e) => onRoleChange(row.id, e.target.value)} sx={{ width: '100%' }}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        )
      },
    },
  ]

  return (
    <AdminLayout title="Users | Teslo">
      <Typography variant="h1" component="h1">
        Users
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
