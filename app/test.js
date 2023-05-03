'use client';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const { data } = useSession()
  // console.log(data)
  
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
      {data?.user ? (
          <>
            <p className="text-sky-600"> {data.user.Email}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          null
        )}
    </>
  );
};

export default HomePage;
