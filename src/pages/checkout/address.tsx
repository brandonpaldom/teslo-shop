import { ShopLayout } from '@/components/layouts'
import { CartContext } from '@/context'
import { states } from '@/utils'
import NoSsr from '@mui/base/NoSsr'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  firstName: string
  lastName: string
  address: string
  addressLine2?: string
  zipCode: string
  city: string
  state: string
  phone: string
}

const getAddressFromCookies = (): Inputs => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    addressLine2: Cookies.get('addressLine2') || '',
    zipCode: Cookies.get('zipCode') || '',
    city: Cookies.get('city') || '',
    state: Cookies.get('state') || '',
    phone: Cookies.get('phone') || '',
  }
}

export default function AddressPage() {
  const router = useRouter()
  const { updateShippingAddress } = useContext(CartContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: getAddressFromCookies() })

  const onSubmitAddress: SubmitHandler<Inputs> = async (data) => {
    updateShippingAddress(data)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title="Teslo | Checkout" description="Teslo | Checkout">
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Box sx={{ maxWidth: { xs: '480px', lg: '1024px' }, margin: '0 auto' }}>
          <Typography variant="h1" component="h1">
            Checkout
          </Typography>
          <Box sx={{ mt: 4, maxWidth: '768px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
              <TextField
                type="text"
                label="First Name"
                variant="filled"
                fullWidth
                {...register('firstName', { required: 'First name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                type="text"
                label="Last Name"
                variant="filled"
                fullWidth
                {...register('lastName', { required: 'Last name is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
              <TextField
                type="text"
                label="Address"
                variant="filled"
                fullWidth
                {...register('address', { required: 'Address is required' })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <TextField type="text" label="Adress Line 2 (optional)" variant="filled" fullWidth {...register('addressLine2')} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
              <TextField
                type="text"
                label="Zip Code"
                variant="filled"
                fullWidth
                {...register('zipCode', { required: 'Zip code is required' })}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
              <TextField
                type="text"
                label="City"
                variant="filled"
                fullWidth
                {...register('city', { required: 'City is required' })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
              <FormControl variant="filled" fullWidth>
                <NoSsr>
                  <TextField
                    key={Cookies.get('state') || states[0].abbreviation}
                    select
                    defaultValue={Cookies.get('state') || states[0].abbreviation}
                    label="State"
                    variant="filled"
                    fullWidth
                    {...register('state', { required: 'State is required' })}
                    error={!!errors.state}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </NoSsr>
              </FormControl>
              <TextField
                type="tel"
                label="Mobile Phone Number"
                variant="filled"
                fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start">+1</InputAdornment> }}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              <Button type="submit" variant="contained" color="secondary" sx={{ width: '320px' }}>
                Review Order
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </ShopLayout>
  )
}
