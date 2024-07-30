import { Separator } from '@/components/ui/separator';
import { getSession } from '@/utils/actions/authentication';
import clsx from 'clsx';
import { Banknote, Folder, HomeIcon, Ticket, User, Users } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardSideBar() {
  const user = await getSession();

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">Event Management</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
              )}
              href="/dashboard"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <HomeIcon className="h-3 w-3" />
              </div>
              Home
            </Link>

            {user?.role === 'organizer' ? (
              <>
                <Link
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                  )}
                  href="/dashboard/events"
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <Folder className="h-3 w-3" />
                  </div>
                  Events
                </Link>
                <Link
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                  )}
                  href="/dashboard/transactions"
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <Banknote className="h-3 w-3" />
                  </div>
                  Transactions
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                  )}
                  href="/dashboard/tickets"
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <Ticket className="h-3 w-3" />
                  </div>
                  Your Tickets
                </Link>
                <Link
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                  )}
                  href="/dashboard/transactions"
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <Banknote className="h-3 w-3" />
                  </div>
                  Your Transactions
                </Link>
              </>
            )}

            <Separator className="my-3" />
            <Link
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
              )}
              href="/dashboard/profile"
              id="onboarding"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                <User className="h-3 w-3" />
              </div>
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
