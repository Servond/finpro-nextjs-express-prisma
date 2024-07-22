'use client';

import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { usePathname } from 'next/navigation';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  const path: string = usePathname();

  return (
    <>
      {path.startsWith('/dashboard') ? (
        <>
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: '#f0f0f0',
            }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              MP07 - Albert Aaron
            </Typography>
          </Box>
        </>
      ) : (
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#f0f0f0',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              MP07 - Albert Aaron
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Footer;