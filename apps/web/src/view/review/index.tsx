"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CloudUploadOutlined } from "@mui/icons-material";
import { withFormik } from "formik";
import * as Yup from "yup";

import { FormValues, FormProps } from "./types";
import { IReviews } from "@/interface/review.interface";

import PageWrapper from "../global/components/pageWrapper";
import InnerForm from "./components/innerForm";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  comment: Yup.string().required("Comment is required"),
  rating: Yup.number().required("Rating is required").min(1).max(5),
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

const ReviewView = () => {
  const [files, setFiles] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const router = useRouter();

  const uploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setFiles(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  };

  const registerEvent = async ({ username, comment, rating }: IReviews) => {
    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          comment,
          rating,
          file: files?.name,
        }),
      });

      const data = await response.json();
      alert(data?.message || "Review submitted successfully");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const EventForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      username: props.initialUsername || "",
      comment: props.initialComment || "",
      rating: props.initialRating || "",
    }),
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    handleSubmit: async (values, { resetForm }) => {
      await registerEvent(values);
      resetForm();
      router.push("/");
    },
  })(InnerForm);

  return (
    <PageWrapper
      sx={{
        backgroundColor: "white",
      }}
    >
      <Container
        sx={{
          height: "100vh",
        }}
      >
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
              Create a Review
            </Typography>
            {/* <Box>
              {!previewImage && (
                // <Button
                //   component="label"
                //   role={undefined}
                //   variant="contained"
                //   tabIndex={-1}
                //   startIcon={<CloudUploadOutlined />}
                // >
                //   Upload file
                //   <VisuallyHiddenInput
                //     type="file"
                //     onChange={uploader}
                //   />
                // </Button>
              )}
              {previewImage && (
                <Box>
                  <img width="420px" height="240px" src={previewImage} alt="Event Preview"/>
                </Box>
              )}
            </Box> */}
            <EventForm />
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default ReviewView;
