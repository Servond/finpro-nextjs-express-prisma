"use client";

import React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "rgb(38 38 38)", padding: "2rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth={false}>
        <Grid pl={20} pr={20} container spacing={2} sx={{ justifyContent: "center", color: "white" }}>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography gutterBottom sx={{ fontSize: "18px" }}>
              About Us
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 100 }}>
              We are a company committed to providing <br/> the best products and services to our customers.
            </Typography>
          </Grid>
          <Grid width={40} item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography gutterBottom sx={{ fontSize: "18px" }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem', fontSize: "14px", fontWeight: 100 }}>
                Home
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem', fontSize: "14px", fontWeight: 100 }}>
                Products
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem', fontSize: "14px", fontWeight: 100 }}>
                Contact Us
              </Link>
            </Box>
          </Grid>
          <Grid width={40} item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography gutterBottom sx={{ fontSize: "18px" }}>
              Contact Us
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 100 }}>
              Email: support@company.com
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 100 }}>
              Phone: (123) 456-7890
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 100 }}>
              Address: 123 Main Street, City, Country
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
