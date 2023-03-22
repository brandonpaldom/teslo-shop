import { FC } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'

interface Props {
  currentValue: number
  maxValue: number
  updateQuantity: (newValue: number) => void
}

export const ItemCounter: FC<Props> = ({ currentValue, updateQuantity, maxValue }) => {
  const addOrRemove = (value: number) => {
    if (currentValue + value > 0 && currentValue + value <= maxValue) {
      updateQuantity(currentValue + value)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={() => addOrRemove(-1)} size="small">
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>
      <Typography sx={{ fontWeight: 700 }}>{currentValue}</Typography>
      <IconButton onClick={() => addOrRemove(+1)} size="small">
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </Box>
  )
}
