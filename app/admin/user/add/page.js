'use client';

import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import Loading from './../../../../components/Loading';
import { useSession } from "next-auth/react"
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';

const page = () => {
  const { data: sessionData, status : sessionStatus } = useSession()
  const toast = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    NIP : '',
    NIK : '',
    Name : '',
    Email : '',
    Alamat : '',
    Telp : '',
    Role : '',
  })
  const listRole = [
    { name: 'Admin', value: 'admin' },
    { name: 'User', value: 'user' }
  ];

  useEffect(() => {
    if(sessionStatus != 'loading') {
      setLoading(false)
      // console.log(first)
    }
  }, [sessionStatus])

  const saveHandler = async () => {
    setLoading(true)

    const res = await fetch(`/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionData.user.accessToken,
      },
      body: JSON.stringify(formData)
    });

    if(res.status == 400) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: res.statusText,
      });
    } 
    else {
      router.push('/admin/user')
    }
    setLoading(false);
  }

  // if (loading) { return <Loading isDashboard={false} /> } 
  return (
    <>
    <Toast ref={toast} />
    {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">USER MANAGEMENT</h3>
            </div>
            <div className="space-x-2">
              <Link
                className="text-sky-600 hover:text-sky-700"
                href={'/admin/user'}
              >
              <Button label="Cancel" severity="danger" size="small" outlined />
              </Link>
              <Button label="Save" onClick={saveHandler} size="small" />
            </div>
          </div>
          <div className="my-3">
            <h5 className="font-bold mb-3">NIP</h5>
              <InputText className="w-full" placeholder="Insert NIP" name="NIP" value={formData.NIP} onChange={(e) => setFormData({ ...formData, NIP : e.target.value })} />
          </div>
          <div className="my-3">
            <h5 className="font-bold mb-3">NIK</h5>
              <InputText className="w-full" placeholder="Insert NIK" name="NIK" value={formData.NIK} onChange={(e) => setFormData({ ...formData, NIK : e.target.value })} />
          </div>
          <div className="my-3">
            <h5 className="font-bold mb-3">Name</h5>
              <InputText className="w-full" placeholder="Insert Name" name="Name" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name : e.target.value })} />
          </div>
          <div className="my-3">
            <h5 className="font-bold mb-3">Email</h5>
              <InputText className="w-full" placeholder="Insert Email" name="Email" value={formData.Email} onChange={(e) => setFormData({ ...formData, Email : e.target.value })} />
          </div>
          <div className="my-3">
            <h5 className="font-bold mb-3">Alamat</h5>
              <InputText className="w-full" placeholder="Insert Alamat" name="Alamat" value={formData.Alamat} onChange={(e) => setFormData({ ...formData, Alamat : e.target.value })} />
          </div>
          <div className="my-3">
            <h5 className="font-bold mb-3">Telp</h5>
              <InputText className="w-full" placeholder="Insert Telp" name="Telp" value={formData.Telp} onChange={(e) => setFormData({ ...formData, Telp : e.target.value })} />
          </div>
          <div className="my-3">
            <h5 className="font-bold mb-3">Role</h5>
              <Dropdown value={formData.Role}  onChange={(e) => setFormData({ ...formData, Role : e.value })} options={listRole} optionLabel="name" placeholder="Select Role" className="w-full md:w-14rem" />
          </div>
        </>
      )}
    </>
  )
}

export default page