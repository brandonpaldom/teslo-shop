import Image from 'next/image'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export const AuthNavbar = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={'/teslo.svg'} alt="Teslo Logo" width={93} height={12} />
        </Link>
      </Toolbar>
    </AppBar>
  )
}
