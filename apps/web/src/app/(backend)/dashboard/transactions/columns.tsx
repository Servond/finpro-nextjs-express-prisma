'use client';

import { Button } from '@/components/ui/button';
import { Transaction } from '@/types/transaction.types';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'event_name',
    header: 'Event Name',
  },
  {
    accessorKey: 'total_amount',
    header: 'Price to Pay',
    cell: ({ row }) => {
      return `${row.original.total_amount.toLocaleString('id-ID')}`;
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
                : 'bg-red-100 text-red-800',
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
      return date.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Link href={`/dashboard/transactions/${row.original.transaction_id}`}>
            <Button size="sm" variant="outline">
              Pay Ticket
            </Button>
          </Link>
          <Link
            href={`/dashboard/transactions/${row.original.transaction_id}/cancel`}
          >
            <Button size="sm" variant="destructive">
              Cancel Payment
            </Button>
          </Link>
        </div>
      );
    },
  },
];
