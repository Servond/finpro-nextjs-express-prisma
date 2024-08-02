import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EnterEmail from './EnterEmail';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    router.push({
      pathname: '/signup/continue',
      query: { email },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterEmail;
