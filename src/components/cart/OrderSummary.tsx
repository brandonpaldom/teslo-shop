import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const OrderSummary: FC = () => {
  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Number of items</Typography>
        <Typography>3</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Shipping</Typography>
        <Typography>Standard</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Subtotal</Typography>
        <Typography>$ 252.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Sales Tax 16%</Typography>
        <Typography>$ 48.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography fontWeight={600} fontSize={20}>
          Total
        </Typography>
        <Typography fontWeight={600} fontSize={20}>
          $ 300.00
        </Typography>
      </Box>
    </Box>
  )
}
