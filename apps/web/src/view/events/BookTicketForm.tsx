'use client';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Ticket, ticketSchema } from '@/types/ticket.types';
import { Event } from '@/types/event.types';
import { createTicket } from '@/utils/actions/ticket';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

type BookTicketFormProps = {
  event: Event;
  isUserTicket?: boolean;
  user_id?: number | undefined | null;
};

export default function BookTicketForm({
  event,
  isUserTicket,
  user_id,
}: BookTicketFormProps) {
  const form = useForm<Ticket>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      user_id: user_id as number,
      event_id: event.event_id as number,
      price: event.ticket_price,
    },
  });

  const { control, handleSubmit } = form;
  const router = useRouter();

  const onSubmit = async (data: Ticket) => {
    try {
      const response = createTicket(JSON.parse(JSON.stringify(data)));

      toast.promise(response, {
        loading: 'Booking ticket...',
        success: 'Ticket booked successfully',
        error: 'Ticket booking failed',
      });

      await response;
    } catch (error) {
      return error;
    } finally {
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="quantity"
          render={({ field }) => (
            <div>
              <FormLabel htmlFor="quantity">Ticket Quantity</FormLabel>
              <FormControl>
                {isUserTicket && isUserTicket ? (
                  <Input
                    max={event.ticket_limit}
                    type="number"
                    id="quantity"
                    disabled
                    {...field}
                  />
                ) : (
                  <Input
                    max={event.ticket_limit}
                    type="number"
                    id="quantity"
                    {...field}
                  />
                )}
              </FormControl>
              <FormDescription>
                {event.available_seats === 0
                  ? null
                  : `Seats available: ${event.available_seats}/${event.total_seats}`}
              </FormDescription>
              <FormMessage />
            </div>
          )}
        />
        <Separator />
        {isUserTicket ? (
          <Button type="submit" className="w-full" disabled>
            Ticket already booked
          </Button>
        ) : event.available_seats === 0 ? (
          <Button type="submit" className="w-full" disabled>
            Sold out
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Book ticket
          </Button>
        )}
      </form>
    </Form>
  );
}
