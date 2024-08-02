import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './global/components/navbar/Header';
import Footer from './global/components/navbar/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Eventify - Discover Your Next Event',
  description: 'Your 1st Event Marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}
