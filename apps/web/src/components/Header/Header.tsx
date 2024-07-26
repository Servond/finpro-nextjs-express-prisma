'use client'

import React, { useState } from "react";
import User from "@/assets/users/Bagas.jpeg"
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const [isClick, setisClick] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isLoginSm, setisLoginSm] = useState(false);

  const toggleNavbar = (): void => {
    setisClick(!isClick)
  }

  const loginUser = (): void => {
    setisLogin(!isLogin)
  }

  return <>

    <nav className="bg-black text-white p-4 sm:p-4 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">

        {/* Judul */}
        <a href="/" className="flex items-center text-lg sm:text-3xl font-bold mx-4">
          HALAMAN BELAKANG
        </a>

        {/* Navigator */}
        <div className="hidden md:block">
          <div>

            <Link href="/" className="mx-6 hover:text-yellow-600">
              Home
            </Link>

            <Link href="/pages/tickets" className="mx-6 hover:text-yellow-600">
              Tickets
            </Link>

            <Link href="/pages/day1" className="mx-6 hover:text-yellow-600">
              Day 1
            </Link>

            <Link href="/pages/day2" className="mx-6 hover:text-yellow-600">
              Day 2
            </Link>

          </div>
        </div>

        {/* LogIn */}
        <div>
          <Link href="/signin" className="bg-yellow-600 rounded p-2 text-sm md:text-md">Sign In</Link>
        </div>


        {/* Responsiv Navbar */}
        <div className="md:hidden flex items-center">
          <button className="inline-flex items-center justify-center p-2 rounded-md text-white
            hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleNavbar}>
            {isClick ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

      </div>


      {isClick && (
        <div className="md:hidden">
          <div className=" px-2 pt-2 pb-3 space-y-1 sm:px-3">

            <Link href="/" className="mx-2 block text-center hover:text-gray-300">
              Home
            </Link>

            <Link href="/pages/tickets" className="mx-2 block text-center hover:text-gray-300">
              Tickets
            </Link>

            <Link href="/pages/day1" className="mx-2 block text-center hover:text-gray-300">
              Day 1
            </Link>

            <Link href="/pages/day2" className="mx-2 block text-center hover:text-gray-300">
              Day 2
            </Link>

          </div>
        </div>
      )}

    </nav>

  </>;
};
