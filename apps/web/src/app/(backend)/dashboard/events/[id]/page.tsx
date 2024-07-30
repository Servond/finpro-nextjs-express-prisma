import { getEventAttendees } from '@/utils/actions/events';
import { columns } from './columns';
import { DataTable } from './data-table';
import BackButton from '@/components/dashboard/BackButton';

export default async function EventAttendeesPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const data = await getEventAttendees(params.id);
  return (
    <div className="container mx-auto py-10">
      <BackButton className="ml-[-1rem]" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
