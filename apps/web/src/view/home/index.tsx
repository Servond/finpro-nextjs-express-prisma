"use client";

import React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";

import { useAppSelector } from "@/lib/hooks";

import PageWrapper from "../global/components/pageWrapper";

const HomeView = () => {
  const { status, user } = useAppSelector((state) => state.auth);
  return (
    <PageWrapper sx={{ backgroundColor: "white" }}>
      <Container>
        <Box
          sx={{
            marginTop: "1rem",
            padding: "1rem"
          }}
        >
          <Typography sx={{ textAlign: "start" }}>
            {status.isLogin ? `Welcome back ${user.email}` : ""}
          </Typography>
          {user.avatar && status.isLogin && (
            <Box>
              <img
                width="420px"
                height="240px"
                src={`${process.env.IMAGE_URL}/avatar/${user.avatar}`}
              />
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          sx={{
            marginTop: "1rem",
            padding: "1rem",
            justifyContent: "center",
          }}
        >
          <Stack spacing={8}>
          <img 
              src="/poster1.jpg" 
              alt="Your Todo Image" 
              width="1020px"
              height="auto"
              style={{ borderRadius: "10px", textAlign: "end" }}
            />
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default HomeView;
