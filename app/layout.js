'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { LayoutProvider } from '../context/layoutcontext';
import AppBar from '../components/appbar';
import './styles/layout/layout.scss';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

export const metadata = {
    title: 'Koperasi MPA',
    description: 'Created by Coz',
};

{
    /* <LayoutProvider>
    <Layout>
        <Component {...pageProps} />
    </Layout>
</LayoutProvider>; */
}

export default function RootLayout({ children, session }) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <LayoutProvider>
                        {/* <AppBar /> */}
                        <div className={'  h-screen '}>{children}</div>
                        {/* {children} */}
                    </LayoutProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
