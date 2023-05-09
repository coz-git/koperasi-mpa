import { NextResponse } from 'next/server';
import DB from '../../../lib/db';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    try {
      let decoded = jwt.verify(token, process.env.JWT_KEY);
      if(decoded.Role == 'admin') {
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
    } catch(err) {
      return NextResponse.json('key invalid', { status: 400 });
    }
  }

  return NextResponse.json('something wrong', { status: 400 });
  
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
