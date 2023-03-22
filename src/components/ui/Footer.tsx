import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Footer = () => {
  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="body2" component="span">
        Teslo &copy; 2023
      </Typography>
      <Typography variant="body2" component="span">
        Created by{' '}
        <Link href="https://brandonpalmeros.dev/" underline="hover" target="_blank" rel="noopener">
          Brandon Palmeros
        </Link>
      </Typography>
    </Box>
  )
}
