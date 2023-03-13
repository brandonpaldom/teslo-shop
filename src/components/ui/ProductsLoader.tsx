import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

export const ProductsLoader: FC = () => {
  return (
    <Grid container spacing={4}>
      {Array.from(new Array(12)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Skeleton variant="rounded" width="100%" height="auto" sx={{ aspectRatio: '1 / 1', mb: 0.5 }} />
          <Skeleton />
          <Skeleton variant="text" width="60%" />
        </Grid>
      ))}
    </Grid>
  )
}
