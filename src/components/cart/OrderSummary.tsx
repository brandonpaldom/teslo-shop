import { FC, useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CartContext } from '@/context'
import { formatCurrency } from '@/utils'

export const OrderSummary: FC = () => {
  const { numberOfProducts, subTotal, tax, total } = useContext(CartContext)

  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Number of items</Typography>
        <Typography>{numberOfProducts}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Shipping</Typography>
        <Typography>Free</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Subtotal</Typography>
        <Typography>{formatCurrency(subTotal)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Sales tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.16) * 100}%)</Typography>
        <Typography>{formatCurrency(tax)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography fontWeight={600} fontSize={20}>
          Total
        </Typography>
        <Typography fontWeight={600} fontSize={20}>
          {formatCurrency(total)}
        </Typography>
      </Box>
    </Box>
  )
}
