'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import AppBar from '../components/appbar';
// import { LayoutProvider } from '../layout/context/layoutcontext';
// import { LayoutProvider } from '../context/layoutcontext';
// import Layout from '../layout/layout';
// import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
// import 'primeicons/primeicons.css';
// import '../styles/layout/layout.scss';

export const metadata = {
  title: 'Koperasi MPA',
  description: 'Created by Coz',
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <head>
        <link
          id="theme-css"
          href="/themes/lara-light-indigo/theme.css"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <SessionProvider>
          {/* <LayoutProvider> */}
          {/* <Layout> */}
          <AppBar />
          <div>{children}</div>
          {/* </Layout> */}
          {/* </LayoutProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
