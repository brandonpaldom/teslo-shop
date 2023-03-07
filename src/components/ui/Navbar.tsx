import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Image from 'next/image'

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  { title: 'Men', href: '/category/men' },
  { title: 'Women', href: '/category/women' },
  { title: 'Kids', href: '/category/kids' },
]

export const Navbar = () => {
  return (
    <AppBar>
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
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          {navItems.map((navItem) => (
            <Link key={navItem.title} href={navItem.href}>
              <Button>{navItem.title}</Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <SearchOutlinedIcon color="primary" />
          </IconButton>
          <Link href="/cart">
            <IconButton>
              <Badge badgeContent={3} color="secondary">
                <ShoppingCartOutlinedIcon color="primary" />
              </Badge>
            </IconButton>
          </Link>
          <Button>Menu</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
