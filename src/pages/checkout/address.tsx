import { useState } from 'react'
import { ShopLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { MuiTelInput } from 'mui-tel-input'

export default function AddressPage() {
  const [phone, setPhone] = useState('')

  const handleChange = (newPhone: string) => {
    setPhone(newPhone)
  }

  return (
    <ShopLayout title="Teslo | Checkout" description="Teslo | Checkout">
      <Box sx={{ maxWidth: { xs: '480px', lg: '1024px' }, margin: '0 auto' }}>
        <Typography variant="h1" component="h1">
          Checkout
        </Typography>
        <Box sx={{ mt: 4, maxWidth: '768px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
            <TextField label="First Name" variant="filled" fullWidth />
            <TextField label="Last Name" variant="filled" fullWidth />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
            <TextField label="Address" variant="filled" fullWidth />
            <TextField label="Adress Line 2 (optional)" variant="filled" fullWidth />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
            <TextField label="Zip Code" type="number" variant="filled" fullWidth />
            <TextField label="City" variant="filled" fullWidth />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel>State</InputLabel>
              <Select>
                <MenuItem value={1}>State 1</MenuItem>
                <MenuItem value={2}>State 2</MenuItem>
                <MenuItem value={3}>State 3</MenuItem>
              </Select>
            </FormControl>
            <MuiTelInput
              value={phone}
              onChange={handleChange}
              defaultCountry="US"
              onlyCountries={['US', 'MX']}
              variant="filled"
              label="Mobile Phone Number"
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="secondary" sx={{ width: '320px' }}>
              Review Order
            </Button>
          </Box>
        </Box>
      </Box>
    </ShopLayout>
  )
}
