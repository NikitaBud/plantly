import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container sx={ { mt: 4, mb: 2, flexGrow: 1 } }>
        <Outlet/>
      </Container>

      <Box component="footer" sx={ { p: 2, backgroundColor: '#f5f5f5', textAlign: 'center' } }>
        <Typography variant="body2" color="textSecondary">
          © { new Date().getFullYear() } Plantly. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Layout;