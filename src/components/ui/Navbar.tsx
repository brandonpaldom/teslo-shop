import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { CartContext, UIContext } from '@/context'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Banner } from './'
import 'animate.css'

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  { title: 'Men', href: '/category/men' },
  { title: 'Women', href: '/category/women' },
  { title: 'Kids', href: '/category/kid' },
]

export const Navbar = () => {
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
          <Box sx={{ display: isSearchOpen ? 'none' : { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }} className="animate__animated animate__fadeIn">
            {navItems.map((navItem) => (
              <Link key={navItem.title} href={navItem.href}>
                <Button variant={pathname === navItem.href ? 'contained' : 'text'}>{navItem.title}</Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Small screens */}
            {isSearchOpen ? (
              <TextField
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && onSearch()}
                variant="standard"
                fullWidth
                placeholder="Search for products"
                autoComplete="off"
                className="animate__animated animate__fadeIn"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setIsSearchOpen(false)}>
                      <ClearOutlinedIcon />
                    </IconButton>
                  ),
                }}
              />
            ) : (
              <IconButton sx={{ display: { xs: 'none', sm: 'flex' } }} onClick={() => setIsSearchOpen(true)} className="animate__animated animate__fadeIn">
                <SearchOutlinedIcon color="primary" />
              </IconButton>
            )}
            {/* Large screens */}
            <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={toggleSidebar}>
              <SearchOutlinedIcon color="primary" />
            </IconButton>
            <Link href="/cart">
              <IconButton>
                <Badge badgeContent={numberOfProducts} max={9} color="secondary">
                  <ShoppingCartOutlinedIcon color="primary" />
                </Badge>
              </IconButton>
            </Link>
            <Button onClick={toggleSidebar}>Menu</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}
