import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getSession } from '@/utils/actions/authentication';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <DashboardNavbar>
        <main className="flex flex-col gap-4 p-4 lg:gap-6">{children}</main>
      </DashboardNavbar>
    </div>
  );
}
