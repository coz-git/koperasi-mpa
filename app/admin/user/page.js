'use client';

import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const User = () => {
  const products = [
    { nama : 'coz', email : 'sultankosasih@gmail.com' },
    { nama : 'lala', email : 'lala@gmail.com' },
  ]

  return (
    <>
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
          <Column field="nama" header="Code"></Column>
          <Column field="email" header="Name"></Column>
      </DataTable>
    </>
  )
}

export default User