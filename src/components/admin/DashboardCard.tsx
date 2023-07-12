import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface Props {
  title: string
  subtitle: string | number
}

export const DashboardCard: FC<Props> = ({ title, subtitle }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography>{title}</Typography>
          <Typography variant="h3" component="h2" fontWeight={500}>
            {subtitle}
          </Typography>
        </Box>
      </Card>
    </Grid>
  )
}
