'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Interests: React.FC = () => {
  const router = useRouter();

  const handleHomepageClick = () => {
    router.push('homepage');
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">How would you like to get started?</h1>
        <div className="flex space-x-4">
          <div
            className="border p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={handleHomepageClick}
          >
            <Image src="/images/pic2.png" alt="Eventify Homepage" className="mx-auto mb-4 w-32 h-32" width={50} height={50} />
            <p>Discover upcoming events near you!</p>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2">Eventify Homepage</button>
          </div>

          <div
            className="border p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={handleDashboardClick}
          >
            <Image src="/images/bars.png" alt="Dashboard" className="mx-auto mb-4 w-32 h-32" width={50} height={50} />
            <p>Check your events on our dashboard</p>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2">Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interests;
