import { FC } from 'react'
import { SizesInterface } from '@/interfaces'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface Props {
  selectedSize?: string
  sizes: SizesInterface[]
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size="small" variant={selectedSize === size ? 'contained' : 'text'}>
          {size}
        </Button>
      ))}
    </Box>
  )
}
