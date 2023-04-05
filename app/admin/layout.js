'use client';
import Head from 'next/head';

import { LayoutProvider } from '../../context/layoutcontext';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../../styles/layout/layout.scss';
import AdminLayout from '../../components/AdminLayout';

const layout = (props) => {
  return (
    <>
      <LayoutProvider>
        <AdminLayout>
          {/* <AppBar /> */}
          <div>{props.children}</div>
        </AdminLayout>
      </LayoutProvider>
    </>
  );
};

export default layout;
