"use client";

import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";

import PageWrapper from "../global/components/pageWrapper";

const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is the description for product 1.",
    image: "/1.png",
    price: "$100"
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is the description for product 2.",
    image: "/2.png",
    price: "$200"
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is the description for product 3.",
    image: "/3.png",
    price: "$300"
  },
  {
    id: 4,
    title: "Product 4",
    description: "This is the description for product 4.",
    image: "/4.png",
    price: "$400"
  }
];

const ProductView = () => {
  return (
    <PageWrapper sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ marginTop: "1rem", padding: "1rem" }}>
          <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "2rem" }}>
            Our Products
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="200"
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Buy Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default ProductView;
