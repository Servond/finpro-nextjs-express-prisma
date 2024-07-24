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
  },
  {
    accessorKey: 'event_date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.original.event_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'event_time',
    header: 'Time',
    cell: ({ row }) => {
      return new Date(row.original.event_date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
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
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Link href={`/events/${row.original.event_id}`}>
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
