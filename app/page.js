'use client';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <h1 className="flex justify-center items-center p-5 text-green-500 text-lg font-bold">
        This Is The Home Page! Everyone can see it.
      </h1>
      <ul>
        <li>
          <Link
            className="text-sky-600 hover:text-sky-700"
            href={'/auth/login'}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="text-sky-600 hover:text-sky-700"
            href={'/auth/forgotPassword'}
          >
            Lupa Password
          </Link>
        </li>
      </ul>
    </>
  );
};

export default HomePage;
