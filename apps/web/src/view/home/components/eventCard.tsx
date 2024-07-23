"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface EventCardProps {
  event_name: string;
  event_description: string;
  isFree?: boolean;
  event_id: number;
  onBuyTicket: (event_id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event_name, event_description,onBuyTicket , event_id }) => {
  const router = useRouter();



  return (
    <Box >
    <Card variant="elevation" sx={{height:"250px"}}>
      <CardContent>
        <Typography variant="h6" component="div">
          {event_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event_description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
           
            <Button onClick={() => onBuyTicket(event_id)} variant="contained">Buy ticket</Button>
          
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
};

export default EventCard;
