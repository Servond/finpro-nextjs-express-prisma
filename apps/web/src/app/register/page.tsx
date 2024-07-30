'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { json } from 'stream/consumers';

const Register = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    referralCode: '',
    username: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // 'use server';
    try {
      const rest = await fetch('http://localhost:8000/api/samples/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      return await rest.json();
    } catch (error) {}
    console.log(inputs);
  }
  return (
    <>
      <div className="mx-auto my-10 2xl:my-52 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sign In</h1>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label className="sr-only">Email</label>

            <div className="relative">
              <input
                name="email"
                value={inputs.email}
                onChange={handleChange}
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter your email or phone number"
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Password</label>

            <div className="relative">
              <input
                name="password"
                value={inputs.password}
                onChange={handleChange}
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div>
            <label className="sr-only">User Name</label>

            <div className="relative">
              <input
                name="username"
                value={inputs.username}
                onChange={handleChange}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="sr-only">referralCode</label>

            <div className="relative">
              <input
                name="referralCode"
                value={inputs.referralCode}
                onChange={handleChange}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter your refcode"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* <p className="text-sm text-gray-500">
              Dont have an account?
              <a className="underline text-yellow-600" href="#">
                Sign up
              </a>
            </p> */}

            <button
              type="submit"
              className="inline-block rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-white"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
