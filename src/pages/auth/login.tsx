import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import GitHubIcon from '@mui/icons-material/GitHub'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { GetServerSideProps } from 'next'
import { getProviders, getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [error, setError] = useState(false)
  // const [providers, setProviders] = useState<any>({})

  // useEffect(() => {
  //   getProviders().then((data) => {
  //     setProviders(data)
  //   })
  // }, [])

  const onLogin: SubmitHandler<Inputs> = async ({ email, password }) => {
    setError(false)
    await signIn('credentials', { email, password })
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* {Object.values(providers).map((provider: any) => {
                if (provider.name === 'Credentials') {
                  return null
                }

                return (
                  <Button key={provider.name} variant="outlined" color="inherit" fullWidth onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </Button>
                )
              })} */}
              <Button variant="outlined" color="inherit" fullWidth onClick={() => signIn('github')} startIcon={<GitHubIcon />}>
                Sign in with GitHub
              </Button>
            </Box>
            <Divider />
            <Typography sx={{ textAlign: 'center' }}>Don&apos;t have an account?</Typography>
            <Link href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}>
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
