"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log('Logged in user role:', response.data.roleId); // Debugging line

      if (response.data.roleId === 1) {  // Assuming 1 is the role ID for organizers
        router.push('/Interests');
      } else if (response.data.roleId === 2) {  // Assuming 2 is the role ID for users
        router.push('/homepage');
      } else {
        console.error('Unexpected roleId:', response.data.roleId);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-red-500">
      <div className="flex flex-col items-center justify-center w-1/2">
        <form className="bg-white p-8 rounded-lg shadow-md w-2/3" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold mb-8 text-center">Log in</h2>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log in
            </button>
          </div>
          <div className="mt-4 text-center">
            <span>or</span>
          </div>
          <button className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full">
            Email me a login link
          </button>
          <button className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full flex items-center justify-center">
            {/* <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" /> */}
            Sign in with Google
          </button>
          <div className="text-center mt-4">
            <a href="/signup" className="text-blue-500 hover:text-blue-700">
              Sign up
            </a>
          </div>
        </form>
      </div>
      <div className="w-1/2 bg-white"></div>
    </div>
  );
};

export default Login;
