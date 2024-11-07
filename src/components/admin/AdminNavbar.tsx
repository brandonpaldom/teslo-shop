import { CartContext, UIContext } from '@/context'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import 'animate.css'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { Banner } from '../ui'

export const AdminNavbar = () => {
  const { toggleSidebar } = useContext(UIContext)

  return (
    <>
      <AppBar>
        <Banner />
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Image src={'/teslo.svg'} alt="Teslo Logo" width={93} height={12} />
            <Typography component="span" color="primary" fontWeight={600}>
              |
            </Typography>
            <Typography variant="button" component="span" color="primary">
              Shop
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={toggleSidebar}>Menu</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}
