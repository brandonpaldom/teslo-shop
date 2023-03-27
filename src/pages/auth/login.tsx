import { useContext, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/context'
import { AuthLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validations } from '@/utils'
import { tesloApi } from '@/api'
import { useRouter } from 'next/router'

type Inputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { loginUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [error, setError] = useState(false)

  const onLogin: SubmitHandler<Inputs> = async ({ email, password }) => {
    setError(false)
    const isVerified = await loginUser(email, password)

    if (!isVerified) {
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000)

      return
    }

    router.replace('/')
  }

  return (
    <AuthLayout title="Login | Teslo">
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
          <Typography variant="h1" component="h1">
            Sign in
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 4 }}>
              We don&apos;t recognize this sign in combination
            </Alert>
          )}
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TextField
              label="Email Address"
              type="email"
              variant="filled"
              fullWidth
              size="small"
              {...register('email', { required: 'Email is required', validate: validations.isEmail })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              size="small"
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="secondary">
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
      </form>
    </AuthLayout>
  )
}
