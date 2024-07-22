"use client"
import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventList from '../components/eventList.jsx';
import ReviewList from '../components/reviewList.jsx';
import { useAppSelector } from '@/lib/hooks';
import useAuthorizeUser from '@/lib/custHook/useAuthUser';

const HomeUserView: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  useAuthorizeUser()
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', padding: '16px' }}>
        <Typography variant="h2" textAlign="center" mb={4}>User Page</Typography>
        <Typography variant="h2" textAlign="center" mb={4}>
          {`username: ${user.username} - role: ${user.roleName}`}
        </Typography>
        <Box sx={{ width: '100%' }}>
          <EventList />
        </Box>
        <ReviewList/>
      </Box>
    </Container>
  );
};

export default HomeUserView;