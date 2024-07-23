import { getEvents } from '@/utils/actions/events';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function EventsPage() {
  const data = await getEvents();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
