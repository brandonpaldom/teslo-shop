import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

export const Banner = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" color="white" textAlign="center">
        This project is still in development. Some features may not work as expected.
      </Typography>
    </Box>
  )
}
