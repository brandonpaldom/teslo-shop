import { CartContext } from '@/context'
import { formatCurrency } from '@/utils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC, useContext } from 'react'

interface Props {
  orderValues?: {
    numberOfProducts: number
    subTotal: number
    tax: number
    total: number
  }
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { numberOfProducts, subTotal, tax, total } = useContext(CartContext)

  const summaryValues = orderValues || { numberOfProducts, subTotal, tax, total }

  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Number of items</Typography>
        <Typography>{summaryValues.numberOfProducts}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Shipping</Typography>
        <Typography>Free</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Subtotal</Typography>
        <Typography>{formatCurrency(summaryValues.subTotal)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Sales tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.16) * 100}%)</Typography>
        <Typography>{formatCurrency(summaryValues.tax)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography fontWeight={600} fontSize={20}>
          Total
        </Typography>
        <Typography fontWeight={600} fontSize={20}>
          {formatCurrency(summaryValues.total)}
        </Typography>
      </Box>
    </Box>
  )
}
