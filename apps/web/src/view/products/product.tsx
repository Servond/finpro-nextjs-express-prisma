"use client";

import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";

const products = [
  {
    id: 1,
    title: "Jakarta",
    description: "The chocolate cake is absolutely delicious!",
    image: "/1.png",
    price: "IDR 100"
  },
  {
    id: 2,
    title: "Bogor",
    description: "Her poetry beautifully captures life's essence.",
    image: "/2.png",
    price: "IDR 200"
  },
  {
    id: 3,
    title: "Bekasi",
    description: "They decided to run through the park.",
    image: "/3.png",
    price: "FREE"
  },
  {
    id: 4,
    title: "Tangerang",
    description: "She bought the dress online last night.",
    image: "/4.png",
    price: "IDR 400"
  }
];

const ProductView = () => {
  return (
    <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ padding: "1rem" }}>
          <Typography sx={{ textAlign: "left", marginBottom: "2rem", fontSize: "18px" }}>
            Our Products
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card sx={{ borderRadius: "10px" }}>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="200"
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography color="text.secondary" sx={{ fontSize: "14px", fontWeight: 100 }}>
                      {product.description}
                    </Typography>
                    <Typography gutterBottom component="div" sx={{ fontSize: "14px", fontWeight: 600 }}>
                      {product.title}
                    </Typography>
                    <Typography sx={{ textAlign: "right", marginTop: "1rem", fontSize: "14px", fontWeight: 600 }}>
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
