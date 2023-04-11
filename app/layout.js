'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import AppBar from '../components/appbar';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
