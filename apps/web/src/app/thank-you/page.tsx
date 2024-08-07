import React from 'react';
import Link from 'next/link';

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You for Signing Up!</h1>
        <p className="mb-4">Click the link below to go back to the homepage.</p>
        <Link href="/" className="text-yellow-600 underline">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
