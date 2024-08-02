'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/view/events/component/searchbar-view/searchBar';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarRoutes = [
    // { label: 'Create Events', path: '/createevent' },
    { label: 'Find Events', path: '/findevent' },
    { label: 'Sign In', path: '/' },
    { label: 'Sign Up', path: '/' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex justify-between items-center p-4 border-b">
      <Link href="/">
        <Image
          src="/logoassetsoriginal.svg"
          height={150}
          width={150}
          alt="logo"
        />
      </Link>

      <SearchBar />

      <button
        className="lg:hidden flex items-center"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <HiOutlineX className="w-6 h-6" />
        ) : (
          <HiOutlineMenu className="w-6 h-6" />
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 w-48 bg-white border-gray-300 shadow-lg -mt-2 lg:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        style={{ top: 'calc(100% + 8px)', zIndex: 50 }}
      >
        {navbarRoutes.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className="block px-4 py-2 text-sm font-medium hover:text-red-500"
            onClick={() => setIsMenuOpen(false)}
          >
            {route.label}
          </Link>
        ))}
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-2 items-center">
        {navbarRoutes.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className="text-sm font-medium hover:text-red-500 px-3"
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
