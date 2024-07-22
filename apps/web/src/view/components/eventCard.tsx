"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface EventCardProps {
    event_name: string;
    event_description: string;
    isFree?: boolean;
    event_id: number;
}

const EventCard: React.FC<EventCardProps> = ({ event_name, event_description, isFree = false, event_id }) => {
    const router = useRouter();



    return (
        <Box >
            <Card variant="elevation" >
                <CardContent>
                    <Typography variant="h6" component="div">
                        {event_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {event_description}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex' }}>

                        <Button variant="contained">Buy</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EventCard;