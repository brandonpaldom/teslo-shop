import Link from 'next/link'
import { AuthLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function RegisterPage() {
  return (
    <AuthLayout title="Register | Teslo">
      <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Create Account
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TextField label="Full Name" variant="filled" fullWidth size="small" />
          <TextField label="Email Address" type="email" variant="filled" fullWidth size="small" />
          <TextField label="Password" type="password" variant="filled" fullWidth size="small" />
          <Button variant="contained" color="secondary">
            Create account
          </Button>
          <Divider />
          <Typography sx={{ textAlign: 'center' }}>Already have an account?</Typography>
          <Link href="/auth/login">
            <Button variant="contained" color="inherit" fullWidth>
              Sign in
            </Button>
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  )
}
