'use client';

import PayTicketButton from '@/components/dashboard/transaction/PayTicketButton';
import CancelTicketButton from '@/components/dashboard/transaction/CancelTicketButton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Transaction, transactionSchema } from '@/types/transaction.types';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { userSchema } from '@/types/user.types';
import { z } from 'zod';

export const participantColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'event_name',
    header: 'Event Name',
    cell: ({ row }) => {
      return (
        <Link href={`/events/${row.original.event_id}`}>
          <Button variant="link">{row.original.event_name}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'total_amount',
    header: 'Price to Pay',
    cell: ({ row }) => {
      if (row.original.quantity > 1) {
        return `Rp. ${row.original.total_amount.toLocaleString('id-ID')} (${row.original.quantity} tickets)`;
      }
    },
  },
  {
    accessorKey: 'transaction_status',
    header: 'Payment Status',
    cell: ({ row }) => {
      return (
        <span
          className={clsx(
            'px-2 py-1 rounded-full',
            row.original.transaction_status === 'PENDING'
              ? 'bg-yellow-100 text-yellow-800'
              : row.original.transaction_status === 'SUCCESS'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-300 text-red-800',
          )}
        >
          {row.original.transaction_status}
        </span>
      );
    },
  },
  {
    accessorKey: 'transaction_date',
    header: 'Transaction Date',
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      const date = createdAt ? new Date(createdAt) : new Date();
      return date.toLocaleString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {row.original.transaction_status === 'PENDING' ? (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Pay Ticket
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to pay this ticket?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <PayTicketButton
                      transaction_id={row.original.transaction_id}
                    >
                      <AlertDialogAction className="hover:bg-slate-200">
                        Pay Ticket
                      </AlertDialogAction>
                    </PayTicketButton>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    Cancel Ticket
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this ticket?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <CancelTicketButton
                      transaction_id={row.original.transaction_id}
                    >
                      <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700">
                        Cancel Ticket
                      </AlertDialogAction>
                    </CancelTicketButton>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : row.original.transaction_status === 'SUCCESS' ? (
            <Button size="sm" variant="outline" disabled>
              Paid
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              Cancelled
            </Button>
          )}
        </div>
      );
    },
  },
];

const organizerTransactionsSchema = transactionSchema.extend({
  user: userSchema,
});

type OrganizerTransaction = z.infer<typeof organizerTransactionsSchema>;

export const organizerColumns: ColumnDef<OrganizerTransaction>[] = [
  {
    accessorKey: 'event_name',
    header: 'Event Name',
    cell: ({ row }) => {
      return (
        <Link href={`/events/${row.original.event_id}`}>
          <Button variant="link">{row.original.event_name}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'user.full_name',
    header: 'Participant Name',
  },
  {
    accessorKey: 'total_amount',
    header: 'Price to Pay',
    cell: ({ row }) => {
      if (row.original.quantity > 1) {
        return `Rp. ${row.original.total_amount.toLocaleString('id-ID')} (${row.original.quantity} tickets)`;
      }
    },
  },
  {
    accessorKey: 'transaction_status',
    header: 'Payment Status',
    cell: ({ row }) => {
      return (
        <span
          className={clsx(
            'px-2 py-1 rounded-full',
            row.original.transaction_status === 'PENDING'
              ? 'bg-yellow-100 text-yellow-800'
              : row.original.transaction_status === 'SUCCESS'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-300 text-red-800',
          )}
        >
          {row.original.transaction_status}
        </span>
      );
    },
  },
  {
    accessorKey: 'transaction_date',
    header: 'Transaction Date',
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      const date = createdAt ? new Date(createdAt) : new Date();
      return date.toLocaleString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
];
