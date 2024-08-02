'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Head from 'next/head';
import TextInput from './components/text-input';
import Select from './components/select';
import Checkbox from './components/checkbox';
import {
  IPromotion,
  ITicket,
  IEventFormData,
} from '@/interface/event.interface';
import validationSchema from './components/validationSchema';

const initialFormData: IEventFormData = {
  organizerName: '',
  eventTitle: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  address: '',
  venueName: '',
  price: '',
  capacity: '',
  categoryId: '',
  tickets: [],
  imageFile: null,
  isFree: false,
  promotions: [],
};

const handleSubmit = async (
  values: IEventFormData,
  { setSubmitting }: FormikHelpers<IEventFormData>,
) => {
  const formDataWithImage = new FormData();

  const tickets = Array.isArray(values.tickets) ? values.tickets : [];
  const promotions = Array.isArray(values.promotions) ? values.promotions : [];

  if (values.imageFile && values.imageFile instanceof File) {
    formDataWithImage.append('image', values.imageFile);
  }

  tickets.forEach((ticket: ITicket, index: number) => {
    formDataWithImage.append(`tickets[${index}][type]`, ticket.type || '');
    formDataWithImage.append(
      `tickets[${index}][price]`,
      ticket.price?.toString() || '0',
    );
  });

  promotions.forEach((promotion: IPromotion, index: number) => {
    formDataWithImage.append(
      `promotions[${index}][type]`,
      promotion.type || '',
    );
    formDataWithImage.append(
      `promotions[${index}][code]`,
      promotion.code || '',
    );
    formDataWithImage.append(
      `promotions[${index}][amount]`,
      promotion.amount?.toString() || '0',
    );
    formDataWithImage.append(
      `promotions[${index}][maxUses]`,
      promotion.maxUses?.toString() || '0',
    );
    formDataWithImage.append(
      `promotions[${index}][startDate]`,
      promotion.startDate ? new Date(promotion.startDate).toISOString() : '',
    );
    formDataWithImage.append(
      `promotions[${index}][endDate]`,
      promotion.endDate ? new Date(promotion.endDate).toISOString() : '',
    );
    formDataWithImage.append(
      `promotions[${index}][description]`,
      promotion.description || '',
    );
  });

  const price = values.isFree ? '0' : parseFloat(values.price).toString();
  formDataWithImage.append('price', price);
  formDataWithImage.append(
    'capacity',
    parseInt(values.capacity, 10).toString(),
  );
  formDataWithImage.append(
    'categoryId',
    parseInt(values.categoryId, 10).toString(),
  );

  formDataWithImage.append('organizerName', values.organizerName);
  formDataWithImage.append('eventTitle', values.eventTitle);
  formDataWithImage.append('description', values.description);
  formDataWithImage.append('date', new Date(values.date).toISOString());
  formDataWithImage.append('startTime', values.startTime);
  formDataWithImage.append('endTime', values.endTime);
  formDataWithImage.append('location', values.location);
  formDataWithImage.append('address', values.address);
  formDataWithImage.append('venueName', values.venueName);

  console.log('FormData to be sent:', formDataWithImage);

  try {
    const response = await fetch('http://localhost:8080/api/events', {
      method: 'POST',
      body: formDataWithImage,
    });

    if (response.ok) {
      alert('Event created successfully!');
    } else {
      const errorData = await response.json();
      console.error('Failed to create event:', errorData);
      alert(`Failed to create event: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error creating event:', error);
    alert('Error creating event');
  }

  setSubmitting(false);
};

const CreateEventFormView = () => {
  const [formData, setFormData] = useState<IEventFormData>(initialFormData);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:8080/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.target.value = value.replace(/[^0-9]/g, '');
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-7">
      <Head>
        <title>Eventify - Create Event</title>
        <meta name="description" content="Discover Your Next Event" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Create Your Events</h1>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <TextInput
              id="organizerName"
              name="organizerName"
              label="Organizer Name"
            />
            <TextInput id="eventTitle" name="eventTitle" label="Event Title" />
            <TextInput
              id="description"
              name="description"
              label="Description"
              type="textarea"
              rows={4}
              className="whitespace-pre-wrap"
            />
            <TextInput id="date" name="date" label="Date" type="date" />
            <TextInput
              id="startTime"
              name="startTime"
              label="Start Time"
              type="time"
            />
            <TextInput
              id="endTime"
              name="endTime"
              label="End Time"
              type="time"
            />
            <TextInput id="location" name="location" label="Location" />
            <TextInput id="address" name="address" label="Address" />
            <TextInput id="venueName" name="venueName" label="Venue Name" />
            <Checkbox
              name="isFree"
              label="Is this a free event?"
              checked={values.isFree}
              onChange={() => setFieldValue('isFree', !values.isFree)}
            />
            {!values.isFree && (
              <TextInput
                id="price"
                name="price"
                label="Price"
                type="number"
                onInput={handleNumberInput}
              />
            )}
            <TextInput
              id="capacity"
              name="capacity"
              label="Capacity"
              type="number"
              onInput={handleNumberInput}
            />
            <Select
              id="categoryId"
              name="categoryId"
              label="Category"
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />

            {/* Tickets Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tickets
              </label>
              {values.tickets.map((ticket, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <TextInput
                    id={`tickets[${index}].type`}
                    name={`tickets[${index}].type`}
                    label="Ticket Type"
                  />
                  <TextInput
                    id={`tickets[${index}].price`}
                    name={`tickets[${index}].price`}
                    label="Ticket Price"
                    type="number"
                    onInput={handleNumberInput}
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        const newTickets = values.tickets.filter(
                          (_, i) => i !== index,
                        );
                        setFieldValue('tickets', newTickets);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFieldValue('tickets', [
                    ...values.tickets,
                    { type: '', price: '' },
                  ]);
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add Ticket
              </button>
            </div>

            {/* Promotions Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Promotions
              </label>
              {values.promotions.map((promotion, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2"
                >
                  <Select
                    id={`promotions[${index}].type`}
                    name={`promotions[${index}].type`}
                    label="Type"
                    options={[{ value: 'discount', label: 'Discount' }]}
                  />
                  <TextInput
                    id={`promotions[${index}].code`}
                    name={`promotions[${index}].code`}
                    label="Code"
                  />
                  <TextInput
                    id={`promotions[${index}].amount`}
                    name={`promotions[${index}].amount`}
                    label="Amount"
                    type="number"
                    onInput={handleNumberInput}
                  />
                  <TextInput
                    id={`promotions[${index}].maxUses`}
                    name={`promotions[${index}].maxUses`}
                    label="Max Uses"
                    type="number"
                    onInput={handleNumberInput}
                  />
                  <TextInput
                    id={`promotions[${index}].startDate`}
                    name={`promotions[${index}].startDate`}
                    label="Start Date"
                    type="date"
                  />
                  <TextInput
                    id={`promotions[${index}].endDate`}
                    name={`promotions[${index}].endDate`}
                    label="End Date"
                    type="date"
                  />
                  <TextInput
                    id={`promotions[${index}].description`}
                    name={`promotions[${index}].description`}
                    label="Description"
                  />
                  <div className="flex items-center sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newPromotions = values.promotions.filter(
                          (_, i) => i !== index,
                        );
                        setFieldValue('promotions', newPromotions);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFieldValue('promotions', [
                    ...values.promotions,
                    {
                      type: 'discount',
                      code: '',
                      amount: 0,
                      maxUses: 1,
                      startDate: '',
                      endDate: '',
                      description: '',
                    },
                  ]);
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add Promotion
              </button>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label
                htmlFor="imageFile"
                className="block text-sm font-medium text-gray-700"
              >
                Event Image ( 940 x 470 px max 5mb)
              </label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setFieldValue('imageFile', file);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
              <ErrorMessage
                name="imageFile"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isSubmitting ? 'Submitting...' : 'Create Event'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEventFormView;
