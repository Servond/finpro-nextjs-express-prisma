/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserContextType = {
  referralCode: string;
  pointsBalance: number;
  pointsExpiryDate: string | null;
};

const Referrals: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserContextType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser({
            referralCode: userData.referralCode,
            pointsBalance: userData.pointsBalance,
            pointsExpiryDate: userData.pointsExpiryDate,
          });
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };
    fetchUserData();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const formattedExpiryDate = user.pointsExpiryDate
    ? new Date(user.pointsExpiryDate).toLocaleDateString()
    : 'No Expiry Date';

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Referrals</h2>
      <p>Referral Code: {user.referralCode}</p>
      <p>Points Balance: {user.pointsBalance}</p>
      <p>Points Expiry Date: {formattedExpiryDate}</p>
    </div>
  );
};

export default Referrals;
