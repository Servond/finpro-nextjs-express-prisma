"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Stack,
  Input,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CloudUploadOutlined } from "@mui/icons-material";
import { withFormik } from "formik";
import * as Yup from "yup";

import { FormValues, FormProps } from "./types";
import { IUsers } from "@/interface/user.interface";

import PageWrapper from "../global/components/pageWrapper";
import InnerForm from "./components/innerForm";
import instance from "@/utils/axiosInstance";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MaxFileSize = 1 * 1024 * 1024;
const RegisterView = () => {
  const [files, setFiles] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();
  const router = useRouter();

  const uploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      setFiles(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  };

  const register = async ({ email, password }: IUsers) => {
    try {
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);
      if (files) {
        form.append("file", files);
      }
      const { data } = await instance.post("/auth/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      username: props.initialUsername || "",
      email: props.initialEmail || "",
      password: props.initialPassword || "",
      referralId: props.initialReferralId || "",
    }),
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      register({ email, password });
      resetForm();
      router.push("/login");
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
            marginTop: "2rem",
            padding: "2rem",
          }}
        >
          <Stack spacing={8}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Create an Account
            </Typography>
            <Box>
              {!previewImage && (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadOutlined />}
                >
                  Choose Avatar
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => uploader(e)}
                  />
                </Button>
              )}
              {previewImage && (
                <Box>
                  <img width="420px" height="240px" src={previewImage} />
                </Box>
              )}
            </Box>
            <LoginForm />
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default RegisterView;
