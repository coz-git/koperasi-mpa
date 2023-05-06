'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSession } from "next-auth/react"
import Link from 'next/link';

import Loading from './../../../components/Loading';

const User = () => {
  const { data: sessionData, status : sessionStatus } = useSession()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    if(sessionStatus != 'loading') {
      getDataUser()
    }
  }, [sessionStatus])

  const getDataUser = async () => {
    const res = await fetch(`/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionData.user.accessToken,
      },
    });

    const resData = await res.json();

    setData(resData)

    setLoading(false);
  };

  if (loading) { return <Loading isDashboard={true} /> } 
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">USER MANAGEMENT</h3>
        </div>
        <Link
          className="text-sky-600 hover:text-sky-700"
          href={'/admin/user/add'}
        >
          <Button label="Add + " size="small" />
        </Link>
      </div>
      {data.length > 0 && (
        <div className="card">
          <DataTable value={data} paginator showGridlines scrollable responsiveLayout={scroll} rows={5} rowsPerPageOptions={[5, 10]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="NIP" header="NIP"></Column>
            <Column field="NIK" header="NIK"></Column>
            <Column field="Name" header="Name"></Column>
            <Column field="Role" header="Role"></Column>
            <Column field="Email" header="Email"></Column>
            <Column field="Telp" header="Telp"></Column>
            <Column field="Alamat" header="Alamat"></Column>
          </DataTable>
        </div>
      )}
    </>
  )
}

export default User