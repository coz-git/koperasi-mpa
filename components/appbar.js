import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AppBar = () => {
  const { data } = useSession();
  // console.log({ data });

  return (
    <div className="bg-blue-200 p-2 flex gap-5 ">
      <Link className="text-sky-600 hover:text-sky-700" href={'/'}>
        Home
      </Link>

      <Link className="text-sky-600 hover:text-sky-700" href={'/admin/panel'}>
        Admin Panel
      </Link>
      <Link className="text-sky-600 hover:text-sky-700" href={'/user'}>
        User Panel
      </Link>
      <div className="ml-auto flex gap-2">
        {data?.user ? (
          <>
            <p className="text-sky-600"> {data.user.Name}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
