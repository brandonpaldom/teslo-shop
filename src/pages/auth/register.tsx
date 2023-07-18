import { AuthLayout } from '@/components/layouts'
import { AuthContext } from '@/context'
import { validations } from '@/utils'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  name: string
  email: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { registerUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const onRegister: SubmitHandler<Inputs> = async ({ name, email, password }) => {
    setError(false)
    setIsRegistering(true)
    const { error, message } = await registerUser(name, email, password)

    if (error) {
      setError(true)
      setErrorMessage(message!)

      setTimeout(() => {
        setError(false)
      }, 3000)

      return
    }

    try {
      await signIn('credentials', { email, password })
    } catch (error) {
      console.error(error)
      setError(true)
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <AuthLayout title="Register | Teslo">
      <form onSubmit={handleSubmit(onRegister)} noValidate>
        <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
          <Typography variant="h1" component="h1">
            Create Account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 4 }}>
              An account already exists with this email
            </Alert>
          )}
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TextField
              label="Full Name"
              type="text"
              variant="filled"
              fullWidth
              size="small"
              {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
              Create account
            </Button>
            {isRegistering && <LinearProgress />}
            <Divider />
            <Typography sx={{ textAlign: 'center' }}>Already have an account?</Typography>
            <Link href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}>
              <Button variant="contained" color="inherit" fullWidth>
                Sign in
              </Button>
            </Link>
          </Box>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req })
  const { p = '/' } = query

  if (session) {
    return {
      redirect: {
        destination: p as string,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
