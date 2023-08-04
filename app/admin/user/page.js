'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSession } from "next-auth/react"
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';

import Loading from './../../../components/Loading';

const User = () => {
  const { data: sessionData, status : sessionStatus } = useSession()
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const toast = useRef(null);

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

    if(res.status == 400) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: resData,
      });
    } else {
      setData(resData)
    }

    setLoading(false);
  };

  const handleEdit = (data) => {
    console.log({data})
    // router.push(`/admin/user/edit/${data.UserId}`)
    router.push({ 
      pathname: `/admin/user`, 
      query: { userData: data } 
    });
    // router.push({
    //   pathname: '/post/[pid]',
    //   query: { pid: post.id },
    // });
  }

  const handleDelete = (id) => {
    console.log({id})
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button type="button" onClick={() => {handleEdit(rowData)}} size="small" style={{margin : '0 1px'}} icon="pi pi-pencil"></Button>
        <Button type="button" onClick={() => {handleDelete(rowData.UserId)}} size="small" style={{margin : '0 1px'}} severity="danger" icon="pi pi-trash"></Button>
      </>
    )
  }

  // if (loading) { return <Loading isDashboard={true} /> } 
  return (
    <>
      <Toast ref={toast} />
      {loading ? (
        <Loading isDashboard={true} />
      ) : (
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
                <Column headerStyle={{  textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible', display : 'flex', justifyContent : 'space-around' }} body={actionBodyTemplate} />
              </DataTable>
            </div>
            )}
        </>
      )}
    </>
  )
}

export default User