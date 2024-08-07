// src/app/main/layout.tsx
import { Header } from '@/components/Header/Header';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
