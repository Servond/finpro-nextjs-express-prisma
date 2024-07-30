'use client';

import { Button } from '@/components/ui/button';
import { Event } from '@/types/event.types';
import { deleteEvent } from '@/utils/actions/events';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'event_name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <Link href={`/events/${row.original.event_id}`}>
          <Button variant="link">{row.original.event_name}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ row }) => {
      return new Date(row.original.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ row }) => {
      return new Date(row.original.end_date).toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'event_location',
    header: 'Location',
  },
  {
    accessorKey: 'available_seats',
    header: 'Available Seats',
    cell: ({ row }) => {
      return row.original.available_seats === 0
        ? 'Sold Out'
        : `${row.original.available_seats}/${row.original.total_seats}`;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Link href={`/dashboard/events/${row.original.event_id}`}>
            <Button size="sm" variant="outline">
              View
            </Button>
          </Link>
          <Link href={`/dashboard/events/${row.original.event_id}/edit`}>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </Link>
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              deleteEvent(row.original.event_id as number).then(() => {
                window.location.reload();
              })
            }
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
