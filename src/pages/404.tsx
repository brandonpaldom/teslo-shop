import Link from 'next/link'
import { ShopLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Custom404() {
  return (
    <ShopLayout title="Page Not Found" description="Page Not Found">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 40px - 40px - 64px)',
          textAlign: 'center',
        }}
      >
        <Typography component="div" sx={{ fontSize: '160px' }}>
          404
        </Typography>
        <Typography component="h2" sx={{ fontSize: '40px' }}>
          Whoops! Sorry about that.
        </Typography>
        <Typography variant="body1" component="div" color="#a3a3a3">
          Join Starman back at the{' '}
          <Link href="/">
            <Typography
              sx={{
                color: '#737373',
                display: 'inline-flex',
                '&:hover': {
                  color: '#171717',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              homepage
            </Typography>
          </Link>{' '}
          or visit our FAQ Page for help.
        </Typography>
      </Box>
    </ShopLayout>
  )
}
