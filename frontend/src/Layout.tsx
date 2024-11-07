import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div>
      <div className='relative flex h-16 justify-between'>
        <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
          <div className=' ml-6 flex space-x-8'>
            <Link
              to='/'
              className={` inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium ${
                location.pathname === '/'
                  ? 'border-indigo-500 text-gray-900'
                  : 'text-gray-500 '
              }`}
            >
              Home
            </Link>
            <Link
              to='/university'
              className={` inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium ${
                location.pathname === '/university'
                  ? 'border-indigo-500 text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              University
            </Link>
          </div>
        </div>
      </div>
      <main className='container mx-auto p-4'>{children}</main>
    </div>
  );
}
