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
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  return (
    <Box
      sx={{
        minWidth: "300px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email :</FormLabel>
            <Field
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px"
              }}
            />
            {touched.email && errors.email && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.email}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password :</FormLabel>
            <Field
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px"
              }}
            />
            {touched.password && errors.password && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.password}
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
            Login
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}
