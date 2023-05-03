'use client';
import './globals.css';
import { UserProvider } from '../context/userContext';
import { SessionProvider } from 'next-auth/react';

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
          <UserProvider>
            <div>{children}</div>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
