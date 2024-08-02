import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeBanner = () => {
  return (
    <div className="relative w-full h-[600px]">
      <Image
        src="/images/banner.jpg" 
        alt="Event Banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      <div className="absolute bottom-4 right-4 p-4">
        <Link
          href="/findevent"
          className="bg-red-500 text-white py-2 px-4 rounded-md text-sm font-bold shadow-lg hover:bg-red-400 transition"
        >
          Find Your Next Event
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
