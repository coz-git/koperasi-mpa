import { NextResponse } from 'next/server';
import DB from './../../../lib/db';

export async function GET(req) {
  const data = await DB.Users.findMany();
  // let data = {
  //   name: 'Hello, Coz!',
  //   city: 'bogor',
  //   random: [{ name: 'lapotp' }, { name: 'fan' }, { name: 'mouse' }],
  // };

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  // console.log(res);
  const user = await DB.Users.create({
    data: {
      NIK: data.NIK,
      NIP: data.NIP,
      Name: data.Name,
      Alamat: data.Alamat,
      Email: data.Email,
      Telp: data.Telp,
    },
  });

  return NextResponse.json('oke', { status: 200 });
}
