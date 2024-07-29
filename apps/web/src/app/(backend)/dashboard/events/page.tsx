import { getEvents } from '@/utils/actions/events';
import { columns } from './columns';
import { DataTable } from './data-table';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function EventsPage() {
  const data = await getEvents();
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row">
        <div className="relative flex-1 max-w-md w-full mb-4 sm:mb-0">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8 w-full"
          />
        </div>
        <Link href="/dashboard/events/add">
          <Button size="sm" className="ml-4">
            Add Event
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
