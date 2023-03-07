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
        Privacy & Legal
      </Typography>
      <Typography variant="body2" component="span">
        Locations
      </Typography>
      <Typography variant="body2" component="span">
        Recall
      </Typography>
    </Box>
  )
}
