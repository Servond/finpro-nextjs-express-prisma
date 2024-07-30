import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  getTransactionsByOrganizerId,
  getTransactionsByUserId,
} from '@/utils/actions/transaction';
import { DataTable } from './data-table';
import { getSession } from '@/utils/actions/authentication';
import BackButton from '@/components/dashboard/BackButton';
import { organizerColumns, participantColumns } from './columns';

export default async function TransactionPage() {
  const user = await getSession();
  const participantData = await getTransactionsByUserId(
    user?.user_id as number,
  );
  const organizerData = await getTransactionsByOrganizerId(
    user?.user_id as number,
  );

  return (
    <div className="container mx-auto py-10">
      <BackButton className="ml-[-1rem]" />
      {user?.role === 'participant' ? (
        <DataTable columns={participantColumns} data={participantData} />
      ) : (
        <DataTable columns={organizerColumns} data={organizerData} />
      )}
    </div>
  );
}
