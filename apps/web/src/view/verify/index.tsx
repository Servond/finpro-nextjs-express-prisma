"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Stack, Button } from "@mui/material";

import instance from "@/utils/axiosInstance";
import PageWrapper from "../global/components/pageWrapper";

const VerifyView = () => {
  const params = useSearchParams();
  const router = useRouter();

  const verify = async () => {
    try {
      const param = params.toString().replace("token=", "");
      await instance.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${param}`,
        },
      });
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <Box
          display="flex"
          sx={{
            marginTop: "5rem",
            padding: "5rem",
            justifyContent: "center",
          }}
        >
          <Stack spacing={8} alignItems="center">
            <Typography variant="h5" sx={{ textAlign: "end" }}>
              Welcome to todos app, click the button below to verify your
              account
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "15rem",
              }}
              onClick={() => verify()}
            >
              Verify
            </Button>
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default VerifyView;
