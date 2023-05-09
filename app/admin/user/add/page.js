'use client';

import React, {useState} from 'react'
import Link from 'next/link';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import Loading from './../../../../components/Loading';

const page = () => {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nip : '',
    nik : '',
    name : '',
    alamat : '',
    telp : '',
    role : '',
  })
  const listRole = [
    { name: 'Admin', value: 'admin' },
    { name: 'User', value: 'user' }
  ];

  const saveHandler = () => {
    // console.log(first)
    console.log(formData)
  }

  if (loading) { return <Loading isDashboard={true} /> } 
  return (
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
          <InputText className="w-full" placeholder="Insert NIP" name="nip" value={formData.nip} onChange={(e) => setFormData({ ...formData, nip : e.target.value })} />
      </div>
      <div className="my-3">
        <h5 className="font-bold mb-3">NIK</h5>
          <InputText className="w-full" placeholder="Insert NIK" name="nik" value={formData.nik} onChange={(e) => setFormData({ ...formData, nik : e.target.value })} />
      </div>
      <div className="my-3">
        <h5 className="font-bold mb-3">Name</h5>
          <InputText className="w-full" placeholder="Insert Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name : e.target.value })} />
      </div>
      <div className="my-3">
        <h5 className="font-bold mb-3">Alamat</h5>
          <InputText className="w-full" placeholder="Insert Alamat" name="alamat" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat : e.target.value })} />
      </div>
      <div className="my-3">
        <h5 className="font-bold mb-3">Telp</h5>
          <InputText className="w-full" placeholder="Insert Telp" name="telp" value={formData.telp} onChange={(e) => setFormData({ ...formData, telp : e.target.value })} />
      </div>
      <div className="my-3">
        <h5 className="font-bold mb-3">Role</h5>
          <Dropdown value={formData.role}  onChange={(e) => setFormData({ ...formData, role : e.value })} options={listRole} optionLabel="name" placeholder="Select Role" className="w-full md:w-14rem" />
      </div>
    </>
  )
}

export default page