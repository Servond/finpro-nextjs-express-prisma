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
            <FormLabel htmlFor="eventname">Event Name</FormLabel>
            <Field
              name="eventname"
              type="text"
              onChange={handleChange}
              value={values.eventname}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.eventname && errors.eventname && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.eventname}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Field
              name="price"
              type="number"
              onChange={handleChange}
              value={values.price}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.price && errors.price && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.price}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Field
              name="date"
              type="date"
              onChange={handleChange}
              value={values.date}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.date && errors.date && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.date}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="time">Time</FormLabel>
            <Field
              name="time"
              type="time"
              onChange={handleChange}
              value={values.time}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.time && errors.time && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.time}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Field
              name="location"
              type="location"
              onChange={handleChange}
              value={values.location}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.location && errors.location && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.location}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Field
              name="description"
              type="description"
              onChange={handleChange}
              value={values.description}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.description && errors.description && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.description}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="seat">Seat</FormLabel>
            <Field
              name="seat"
              type="seat"
              onChange={handleChange}
              value={values.seat}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.seat && errors.seat && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.seat}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Field
              name="type"
              type="type"
              onChange={handleChange}
              value={values.type}
              style={{
                backgroundColor: "rgb(245 245 245)",
                height: "40px",
                borderRadius: "10px",
              }}
            />
            {touched.type && errors.type && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {errors.type}
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
