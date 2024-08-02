import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  organizerName: Yup.string().required('Organizer Name is required'),
  eventTitle: Yup.string().required('Event Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required'),
  startTime: Yup.string().required('Start Time is required'),
  endTime: Yup.string().required('End Time is required'),
  location: Yup.string().required('Location is required'),
  address: Yup.string().required('Address is required'),
  venueName: Yup.string().required('Venue Name is required'),
  categoryId: Yup.string().required('Category is required'),
  isFree: Yup.boolean().required(),
  imageFile: Yup.mixed().required(
    'Max 5mb 940 x 470 px image file is required',
  ),
  price: Yup.number().when('isFree', {
    is: false,
    then: (schema) =>
      schema
        .required('Price is required')
        .integer('Price must be an integer')
        .typeError('Price must be a number without commas or decimals'),
    otherwise: (schema) => schema.notRequired(),
  }),
  capacity: Yup.number().required('Capacity is required'),
  tickets: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().nullable(),
        price: Yup.number().integer().nullable(),
      }),
    )
    .nullable()
    .default([]),
  promotions: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().oneOf(['discount']).nullable(),
        code: Yup.string().nullable(),
        amount: Yup.number().integer().nullable(),
        maxUses: Yup.number().integer().nullable(),
        startDate: Yup.date().nullable(),
        endDate: Yup.date().nullable(),
        description: Yup.string().nullable(),
      }),
    )
    .nullable()
    .default([]),
});

export default validationSchema;
