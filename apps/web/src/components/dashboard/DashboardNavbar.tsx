import { Button } from '@/components/ui/button';
import { Dialog, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getSession } from '@/utils/actions/authentication';
import { Banknote, Folder, HomeIcon, Menu, User, Users } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export default async function DashboardNavbar({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <Menu />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Event Management</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </DialogClose>
              {session?.role === 'organizer' ? (
                <>
                  <DialogClose asChild>
                    <Link href="/dashboard/events">
                      <Button variant="outline" className="w-full">
                        <Folder className="mr-2 h-4 w-4" />
                        Events
                      </Button>
                    </Link>
                  </DialogClose>
                  <DialogClose asChild>
                    <Link href="/dashboard/attendees">
                      <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Attendees
                      </Button>
                    </Link>
                  </DialogClose>
                </>
              ) : (
                <DialogClose asChild>
                  <Link href="/dashboard/transactions">
                    <Button variant="outline" className="w-full">
                      <Banknote className="mr-2 h-4 w-4" />
                      Transactions
                    </Button>
                  </Link>
                </DialogClose>
              )}

              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/dashboard/profile">
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <p>Welcome, {session?.full_name}</p>
        </div>
      </header>
      {children}
    </div>
  );
}
