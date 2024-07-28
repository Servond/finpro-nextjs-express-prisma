import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { FormikProps, Form, Field } from "formik";
import { FormValues } from "../types";

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = props;

  return (
    <Box
      sx={{
        minWidth: "300px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Field
              name="username"
              type="text"
              onChange={handleChange}
              value={values.username}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.username && errors.username && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.username}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="comment">Insert Comment</FormLabel>
            <Field
              name="comment"
              type="text"
              onChange={handleChange}
              value={values.comment}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.comment && errors.comment && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.comment}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <Field
              name="rating"
              type="number"
              onChange={handleChange}
              value={values.rating}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.rating && errors.rating && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.rating}
              </Typography>
            )}
          </FormControl>
          <Button
            sx={{
              marginTop: "15px",
            }}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}
