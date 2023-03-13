import { FC } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'

interface Props {}

export const ItemCounter: FC<Props> = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton size="small">
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>
      <Typography sx={{ fontWeight: 700 }}>1</Typography>
      <IconButton size="small">
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </Box>
  )
}
