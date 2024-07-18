"use client";

import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";

const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is the description for product 1.",
    image: "/1.png",
    price: "IDR100"
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is the description for product 2.",
    image: "/2.png",
    price: "IDR100"
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is the description for product 3.",
    image: "/3.png",
    price: "IDR100"
  },
  {
    id: 4,
    title: "Product 4",
    description: "This is the description for product 4.",
    image: "/4.png",
    price: "IDR100"
  }
];

const ProductView = () => {
  return (
    <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ marginTop: "", padding: "2rem" }}>
          <Typography variant="h6" sx={{ textAlign: "left", marginBottom: "2rem", fontSize: "18px" }}>
            Best Offers
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card sx={{ borderRadius: "10px"}}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="200"
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "18px"}}>
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
    </Container>
  );
};

export default ProductView;
