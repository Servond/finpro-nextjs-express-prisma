'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/searchbar-view/searchBar';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roleId, setRoleId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRoleId(decodedToken.roleId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRoleId(null);
    router.push('/');
  };

  const navbarRoutes = [
    { label: 'Find Events', path: '/findevent' },
    ...(!isAuthenticated
      ? [
          { label: 'Sign In', path: '/login' },
          { label: 'Sign Up', path: '/signup' },
        ]
      : [
          { label: 'Profile', path: '/profile' },
          ...(roleId === 1 ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
          { label: 'Sign Out', path: '#', onClick: handleLogout },
        ]),
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex justify-between items-center p-4 border-b">
      <Link href="/">
        <Image
          src="/images/logoassetsoriginal.svg"
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
            onClick={route.onClick}
          >
            {route.label}
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex gap-2 items-center">
        {navbarRoutes.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className="text-sm font-medium hover:text-red-500 px-3"
            onClick={route.onClick}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;