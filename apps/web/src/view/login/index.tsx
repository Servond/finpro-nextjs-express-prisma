"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Stack } from "@mui/material";
import { withFormik } from "formik";
import * as Yup from "yup";

import { useAppDispatch } from "@/lib/hooks";
import { signIn } from "@/lib/features/auth/authSlice";

import { FormValues, FormProps } from "./types";

import PageWrapper from "../global/components/pageWrapper";
import InnerForm from "./components/innerForm";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || "",
      password: props.initialPassword || "",
    }),
    validationSchema: LoginSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      dispatch(signIn({ email, password }));
      resetForm();
      router.push("/");
    },
  })(InnerForm);

  return (
    <PageWrapper
    sx={{
      backgroundColor: "white",
    }}>
      <Container
      sx={{
        height: "100vh"
      }}>
        <Box
          display="flex"
          sx={{
            justifyContent: "center",
            // textAlign: "center",
            marginTop: "2rem",
            padding: "2rem",
          }}
        >
          <Stack spacing={8}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Login
            </Typography>
            <LoginForm />
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default LoginView;
