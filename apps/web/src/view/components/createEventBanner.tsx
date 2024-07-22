import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const CreateEventBanner: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h3">
        Post event
      </Typography> 
      <Link href="/create-event">
        <Button variant="contained" size="large">
          Create event
        </Button>
        </Link>
    </Box>
  );
};

export default CreateEventBanner;