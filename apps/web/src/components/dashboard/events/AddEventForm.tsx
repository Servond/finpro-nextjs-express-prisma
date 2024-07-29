'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Event, eventSchema } from '@/types/event.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createEvent } from '@/utils/actions/events';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { useEffect } from 'react';

const category = {
  festivals: 'Festivals',
  concerts: 'Concerts',
  exhibitions: 'Exhibitions',
  conferences: 'Conferences',
  workshops: 'Workshops',
  shows: 'Shows',
  meetups: 'Meetups',
  parties: 'Parties',
  accommodation: 'Accommodation',
  seminars: 'Seminars',
  social_gatherings: 'Social Gatherings',
  training: 'Training',
  tournaments: 'Tournaments',
  other: 'Other',
};

export default function AddEventForm({ user_id }: { user_id: number }) {
  const form = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      created_by: user_id,
      ticket_price: 0,
    },
  });

  console.log(form.formState.errors);

  const { control, handleSubmit, register, watch, setValue } = form;

  useEffect(() => {
    setValue('available_seats', form.watch('total_seats'));
  }, [form.watch('total_seats'), setValue]);

  const onSubmit = (data: Event) => {
    createEvent(JSON.parse(JSON.stringify(data)));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="event_name"
            render={({ field }) => (
              <div className="space-y-1">
                <FormLabel htmlFor="name">Event Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter event name" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={control}
            name="event_description"
            render={({ field }) => (
              <div className="space-y-1">
                <FormLabel htmlFor="description">Event Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-2 w-full">
            <FormField
              control={control}
              name="start_date"
              render={({ field }) => (
                <div className="space-y-1">
                  <FormLabel htmlFor="date">Start Date &amp; Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      placeholder="Select event date & time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={control}
              name="end_date"
              render={({ field }) => (
                <div className="space-y-1">
                  <FormLabel htmlFor="date">End Date &amp; Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      placeholder="Select event date & time"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.end_date && (
                    <FormMessage>
                      {form.formState.errors.end_date.message}
                    </FormMessage>
                  )}
                </div>
              )}
            />
          </div>
          <FormField
            control={control}
            name="event_location"
            render={({ field }) => (
              <div className="space-y-1">
                <FormLabel htmlFor="location">Event Location</FormLabel>
                <FormControl>
                  <Input
                    id="location"
                    placeholder="Enter event location"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={control}
            name="event_category"
            render={({ field }) => (
              <div className="space-y-1">
                <FormLabel htmlFor="category">Event Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(category).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <FormField
            control={control}
            name="total_seats"
            render={({ field }) => (
              <div className="space-y-1">
                <FormLabel htmlFor="total_seats">Total Seats</FormLabel>
                <FormControl>
                  <Input
                    id="total_seats"
                    type="number"
                    placeholder="Enter number of seats"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={control}
            name="ticket_limit"
            render={({ field }) => (
              <div className="space-y-1">
                <FormLabel htmlFor="ticket_limit">Ticket Limit</FormLabel>
                <FormControl>
                  <Input
                    id="ticket_limit"
                    type="number"
                    placeholder="Enter ticket limit to limit tickets per user"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={control}
            name="ticket_price"
            render={({ field }) => (
              <div className="space-y-1">
                <FormLabel htmlFor="ticket_limit">Ticket Price</FormLabel>
                <FormControl>
                  <Input
                    id="ticket_price"
                    type="number"
                    placeholder="Enter ticket price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <input
            type="hidden"
            {...register('available_seats')}
            value={
              watch('total_seats')
                ? watch('total_seats')
                : form.getValues().total_seats
            }
            readOnly
          />

          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </form>
      </Form>
    </div>
  );
}
