'use client';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';

const HomePage = () => {
  const { isLogin, userData } = useContext(UserContext);
  console.log({ isLogin });
  console.log({ userData });

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
