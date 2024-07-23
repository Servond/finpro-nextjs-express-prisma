'use client';

import { Event } from '@/types/event.types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'event_name',
    header: 'Name',
  },
  {
    accessorKey: 'event_date',
    header: 'Date',
  },
  {
    accessorKey: 'event_time',
    header: 'Time',
  },
  {
    accessorKey: 'event_location',
    header: 'Location',
  },
  {
    accessorKey: 'available_seats',
    header: 'Available Seats',
  },
];
