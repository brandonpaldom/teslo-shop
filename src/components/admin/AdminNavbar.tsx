import { CartContext, UIContext } from '@/context'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import 'animate.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { Banner } from '../ui'

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  { title: 'Men', href: '/category/men' },
  { title: 'Women', href: '/category/women' },
  { title: 'Kids', href: '/category/kid' },
]

export const AdminNavbar = () => {
  const router = useRouter()
  const { pathname } = router
  const { toggleSidebar } = useContext(UIContext)
  const { numberOfProducts } = useContext(CartContext)

  const [search, setSearch] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const onSearch = () => {
    if (setSearch.length === 0) {
      return
    }

    router.push(`/search/${search}`)
  }

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
