"use client";

import React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "rgb(38 38 38)", padding: "2rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth={false}>
        <Grid pl={20} pr={20} container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are a company committed to providing <br/> the best products and services to our customers.
            </Typography>
          </Grid>
          <Grid width={40} item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem' }}>
                Home
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem' }}>
                Products
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem' }}>
                Contact Us
              </Link>
            </Box>
          </Grid>
          <Grid width={40} item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@company.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Main Street, City, Country
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
