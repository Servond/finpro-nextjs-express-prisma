import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Providers } from './providers';
import './globals.css';
import StoreProvider from '@/components/providers/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Halaman Belakang',
  description: 'Event Music',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}

// src/app/layout.tsx
// import React from 'react';
// import { Header } from '@/components/Header/Header';

// const MainLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <>
//       <Header />
//       <main className="bg-black">{children}</main>
//     </>
//   );
// };

// export default MainLayout;
