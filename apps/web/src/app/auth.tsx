'use client';

import React, { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { checkToken } from '@/lib/features/authSlice';

export default function Auth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(checkToken(token));
      }
    }
  });

  return <>{children}</>;
}