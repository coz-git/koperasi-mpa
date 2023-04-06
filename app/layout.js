'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import AppBar from '../components/appbar';

export const metadata = {
  title: 'Koperasi MPA',
  description: 'Created by Coz',
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <head>
        <title>Koperasi MPA || Coz</title>
      </head>
      <body>
        <SessionProvider>
          {/* <AppBar /> */}
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
