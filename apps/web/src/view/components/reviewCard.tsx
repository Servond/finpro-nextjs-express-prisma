import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

interface ReviewCardProps {
  title: string;
  body: string;
  reviewerName: string;
  date: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ title, body, reviewerName, date, rating }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar alt={reviewerName} src="/avatar.jpg" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">{reviewerName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;