import { NextResponse } from 'next/server';
import DB from './../../../../lib/db';

export async function POST(req) {
  const data = await req.json();
  // console.log(res);
  // const user = await DB.Users.create({
  //   data: {
  //     NIK: data.NIK,
  //     NIP: data.NIP,
  //     Name: data.Name,
  //     Alamat: data.Alamat,
  //     Email: data.Email,
  //     Telp: data.Telp,
  //   },
  // });

  return NextResponse.json(data, { status: 200 });
}
