'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUploadOutlined } from '@mui/icons-material';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { FormValues, FormProps } from './types';
import { IEvents } from '@/interface/event.interface';

import PageWrapper from '../global/components/pageWrapper';
import InnerForm from './components/innerForm';

const RegisterSchema = Yup.object().shape({
  eventname: Yup.string().required('Event name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EventView = () => {
  const [files, setFiles] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined,
  );
  const router = useRouter();

  const uploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setFiles(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  };

  const registerEvent = async ({
    eventname,
    price,
    date,
    time,
    location,
    description,
    seat,
    type,
  }: IEvents) => {
    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventname,
          price,
          date,
          time,
          location,
          description,
          seat,
          type,
          file: files?.name,
        }),
      });

      const data = await response.json();
      alert(data?.message || 'Event registered successfully');
    } catch (err) {
      console.error('Error registering event:', err);
    }
  };

  const EventForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      eventname: props.initialEventname || '',
      price: props.initialPrice || '',
      date: props.initialDate || '',
      time: props.initialTime || '',
      location: props.initialLocation || '',
      description: props.initialDescription || '',
      seat: props.initialSeat || '',
      type: props.initialType || '',
    }),
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    handleSubmit: async (values, { resetForm }) => {
      await registerEvent(values);
      resetForm();
      router.push('/');
    },
  })(InnerForm);

  return (
    <PageWrapper
      sx={{
        backgroundColor: 'white',
      }}
    >
      <Container
        sx={{
          height: '100vh',
        }}
      >
        <Box
          display="flex"
          sx={{
            justifyContent: 'center',
            marginTop: '2rem',
            padding: '2rem',
          }}
        >
          <Stack spacing={8}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Create an Event
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
                  Upload file
                  <VisuallyHiddenInput type="file" onChange={uploader} />
                </Button>
              )}
              {previewImage && (
                <Box>
                  <img
                    width="420px"
                    height="240px"
                    src={previewImage}
                    alt="Event Preview"
                  />
                </Box>
              )}
            </Box>
            <EventForm />
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default EventView;
