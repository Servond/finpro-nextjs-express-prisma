"use client";

import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";

<<<<<<< HEAD
=======
import PageWrapper from "../global/components/pageWrapper";

>>>>>>> main
const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is the description for product 1.",
    image: "/1.png",
<<<<<<< HEAD
    price: "IDR100"
=======
    price: "$100"
>>>>>>> main
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is the description for product 2.",
    image: "/2.png",
<<<<<<< HEAD
    price: "IDR100"
=======
    price: "$200"
>>>>>>> main
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is the description for product 3.",
    image: "/3.png",
<<<<<<< HEAD
    price: "IDR100"
=======
    price: "$300"
>>>>>>> main
  },
  {
    id: 4,
    title: "Product 4",
    description: "This is the description for product 4.",
    image: "/4.png",
<<<<<<< HEAD
    price: "IDR100"
=======
    price: "$400"
>>>>>>> main
  }
];

const ProductView = () => {
  return (
<<<<<<< HEAD
    <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ marginTop: "", padding: "2rem" }}>
          <Typography variant="h6" sx={{ textAlign: "left", marginBottom: "2rem", fontSize: "18px" }}>
            Best Offers
=======
    <PageWrapper sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ marginTop: "1rem", padding: "1rem" }}>
          <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "2rem" }}>
            Our Products
>>>>>>> main
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
<<<<<<< HEAD
                <Card sx={{ borderRadius: "10px"}}>
=======
                <Card>
>>>>>>> main
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="200"
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
<<<<<<< HEAD
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "18px"}}>
=======
                    <Typography gutterBottom variant="h5" component="div">
>>>>>>> main
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
<<<<<<< HEAD
    </Container>
=======
    </PageWrapper>
>>>>>>> main
  );
};

export default ProductView;
