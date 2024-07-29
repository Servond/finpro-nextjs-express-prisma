"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Pagination } from "@mui/material";

interface Review {
  id: number;
  username: string;
  comment: string;
  rating: number;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);

  useEffect(() => {
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => setReviews(data.reviews))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Calculate the range of reviews to display on the current page
  const indexOfLastReview = page * rowsPerPage;
  const indexOfFirstReview = indexOfLastReview - rowsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  return (
    <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ padding: "1rem" }}>
          <Typography sx={{ textAlign: "left", marginBottom: "2rem", fontSize: "18px" }}>
            User Reviews
          </Typography>
          <Grid container spacing={2}>
            {currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <Grid item xs={12} sm={6} md={4} key={review.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{review.username}</Typography>
                      <Typography variant="body1">{review.comment}</Typography>
                      <Typography variant="body2">Rating: {review.rating}/5</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No reviews available.</Typography>
            )}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Pagination
              count={Math.ceil(reviews.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default ReviewsPage;
