import React from 'react';
import { Grid, Box } from '@mui/material';
import ReviewCard from './reviewCard';

const ReviewList: React.FC = () => {
  const reviews = [
    { title: 'Review 1', body: 'Review body 1', reviewerName: 'Reviewer 1', date: '2024-07-17', rating: 5 },
    { title: 'Review 2', body: 'Review body 2', reviewerName: 'Reviewer 2', date: '2024-07-17', rating: 4 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ReviewCard {...review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewList;