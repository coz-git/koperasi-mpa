import { NextResponse } from 'next/server';
import DB from '../../../lib/db';

export async function GET(req) {
  const data = await DB.Users.findMany();

  const returnUserData = data.map(obj => {
    return {
        Role: obj.Role,
        Email: obj.Email,
        NIP: obj.NIP,
        NIK: obj.NIK,
        Name: obj.Name,
        Alamat: obj.Alamat,
        Telp: obj.Telp,
        UserId: obj.UserId,
    };
  });

  return NextResponse.json(returnUserData, { status: 200 });
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
