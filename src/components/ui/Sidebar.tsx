import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext, UIContext } from '@/context'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import TextField from '@mui/material/TextField'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined'
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

interface Option {
  label: string
  icon: JSX.Element
  link: string
}

const profileOptions: Option[] = [
  { label: 'Profile', icon: <AccountCircleOutlinedIcon />, link: '/profile' },
  { label: 'My orders', icon: <ShoppingCartOutlinedIcon />, link: '/orders' },
  { label: 'Login', icon: <LoginOutlinedIcon />, link: '/login' },
  { label: 'Logout', icon: <LogoutOutlinedIcon />, link: '/logout' },
]

const categoryOptions: Option[] = [
  { label: 'Men', icon: <MaleOutlinedIcon />, link: '/category/men' },
  { label: 'Women', icon: <FemaleOutlinedIcon />, link: '/category/women' },
  { label: 'Kids', icon: <ChildCareOutlinedIcon />, link: '/category/kid' },
]

const adminOptions: Option[] = [
  { label: 'Products', icon: <LocalMallOutlinedIcon />, link: '/products' },
  { label: 'Orders', icon: <ShoppingCartOutlinedIcon />, link: '/orders' },
  { label: 'Users', icon: <GroupOutlinedIcon />, link: '/users' },
]

export const Sidebar = () => {
  const router = useRouter()
  const { isSidebarOpen, toggleSidebar } = useContext(UIContext)
  const { user, isLoggedIn, logoutUser } = useContext(AuthContext)

  const [search, setSearch] = useState('')

  const onSearch = () => {
    if (setSearch.length === 0) {
      return
    }

    navigateTo(`/search/${search}`)
  }

  const navigateTo = (url: string) => {
    toggleSidebar()
    router.push(url)
  }

  return (
    <Drawer anchor="right" open={isSidebarOpen} sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.3s ease-in-out' }} onClose={toggleSidebar}>
      <Box sx={{ width: 320, padding: 2 }}>
        <List>
          <ListItem disablePadding>
            <TextField
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onSearch()}
              variant="standard"
              fullWidth
              sx={{ m: 2 }}
              placeholder="Search for products"
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={onSearch}>
                    <SearchOutlinedIcon />
                  </IconButton>
                ),
              }}
            />
          </ListItem>
        </List>
        <List sx={{ display: { xs: 'block', sm: 'none' } }}>
          {categoryOptions.map((option) => (
            <ListItem key={option.label} disablePadding onClick={() => navigateTo(option.link)}>
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
        <List>
          {isLoggedIn ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalMallOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={logoutUser}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
              <ListItemButton>
                <ListItemIcon>
                  <LoginOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        {user?.role === 'admin' && (
          <>
            <Divider />
            <ListSubheader>Admin dashboard</ListSubheader>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Drawer>
  )
}
