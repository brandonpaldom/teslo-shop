import Link from 'next/link'
import { AuthLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function LoginPage() {
  return (
    <AuthLayout title="Login | Teslo">
      <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Sign in
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TextField label="Email Address" type="email" variant="filled" fullWidth size="small" />
          <TextField label="Password" type="password" variant="filled" fullWidth size="small" />
          <Button variant="contained" color="secondary">
            Sign in
          </Button>
          <Link href="/auth/register">
            <Typography sx={{ textAlign: 'center', textDecoration: 'underline' }}>Forgot password?</Typography>
          </Link>
          <Divider />
          <Typography sx={{ textAlign: 'center' }}>Don&apos;t have an account?</Typography>
          <Link href="/auth/register">
            <Button variant="contained" color="inherit" fullWidth>
              Create account
            </Button>
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  )
}
