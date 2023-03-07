import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
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
  { label: 'Kids', icon: <ChildCareOutlinedIcon />, link: '/category/kids' },
]

const adminOptions: Option[] = [
  { label: 'Products', icon: <LocalMallOutlinedIcon />, link: '/products' },
  { label: 'Orders', icon: <ShoppingCartOutlinedIcon />, link: '/orders' },
  { label: 'Users', icon: <GroupOutlinedIcon />, link: '/users' },
]

export const Sidebar = () => {
  return (
    <Drawer anchor="right" open={false} sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.3s ease-in-out' }}>
      <Box sx={{ width: 320, padding: 2 }}>
        <List>
          <ListItem disablePadding>
            <TextField variant="standard" fullWidth sx={{ m: 2 }} placeholder="Search" InputProps={{ endAdornment: <SearchOutlinedIcon /> }} />
          </ListItem>
        </List>
        <List sx={{ display: { xs: 'block', sm: 'none' } }}>
          {categoryOptions.map((option) => (
            <ListItem key={option.label} disablePadding>
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
        <List>
          {profileOptions.map((option) => (
            <ListItem key={option.label} disablePadding>
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListSubheader>Admin dashboard</ListSubheader>
        <List>
          {adminOptions.map((option) => (
            <ListItem key={option.label} disablePadding>
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
