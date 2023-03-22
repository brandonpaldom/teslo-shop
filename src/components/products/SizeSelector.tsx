import { FC } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { SizesInterface } from '@/interfaces'

interface Props {
  selectedSize?: SizesInterface
  sizes: SizesInterface[]
  handleSelectedSize: (size: SizesInterface) => void
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, handleSelectedSize }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size="small" variant={selectedSize === size ? 'contained' : 'text'} onClick={() => handleSelectedSize(size)}>
          {size}
        </Button>
      ))}
    </Box>
  )
}
