import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { columns } from './columns';
import { getTransactionsByUserId } from '@/utils/actions/transaction';
import { DataTable } from './data-table';
import { getSession } from '@/utils/actions/authentication';

export default async function TransactionPage() {
  const user = await getSession();
  const data = await getTransactionsByUserId(user?.user_id as number);

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
        <Link href="/dashboard/events/add"></Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
