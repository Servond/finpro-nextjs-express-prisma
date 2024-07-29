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
import { Event } from '@/types/event.types';
import { toast } from 'sonner';
import { createTransaction } from '@/utils/actions/transaction';
import { Transaction, transactionSchema } from '@/types/transaction.types';

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
  const form = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      user_id: user_id as number,
      event_id: event.event_id as number,
      total_amount: 0,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: Transaction) => {
    try {
      const newData: Transaction = {
        ...data,
        total_amount: event.ticket_price * data.quantity,
        event_name: event.event_name,
      };
      const response = createTransaction(JSON.parse(JSON.stringify(newData)));

      toast.promise(response, {
        loading: 'Creating transaction...',
        success:
          'Transaction created successfully, check your dashboard for transaction details',
        error: 'Failed to create transaction',
      });

      await response;
    } catch (error) {
      return error;
    } finally {
      form.reset();
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
