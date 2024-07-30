'use client';

import { Badge } from '@/components/ui/badge';
import { eventSchema } from '@/types/event.types';
import { ticketSchema } from '@/types/ticket.types';
import { userSchema } from '@/types/user.types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const attendeesTableSchema = ticketSchema.extend({
  user: userSchema,
  event: eventSchema,
});

type Attendees = z.infer<typeof attendeesTableSchema>;

export const columns: ColumnDef<Attendees>[] = [
  {
    accessorKey: 'event.event_name',
    header: 'Event',
  },
  {
    accessorKey: 'user.full_name',
    header: 'Name',
  },
  {
    accessorKey: 'user.email',
    header: 'Email',
  },
  {
    accessorKey: 'quantity',
    header: 'Ticket Quantity',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge>{row.original.quantity}</Badge>
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Booked At',
  },
];
