'use client';

import React from 'react'
import Link from 'next/link';
import { Button } from 'primereact/button';

const page = () => {
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
    </>
  )
}

export default page