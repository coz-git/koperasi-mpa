import { NextResponse } from 'next/server';
import DB from './../../../../lib/db';
import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

export async function POST(req) {
  const data = await req.json();
  const user = await DB.Users.findFirst({
    where: { Email: data.email },
  });

  if (user == null) {
    return NextResponse.json('User Not Found', { status: 400 });
  }

  if (user.Password != data.password) {
    return NextResponse.json('Invalid User and Password', { status: 400 });
  }

  /* Sign token */
  user.accessToken = jwt.sign(user, KEY, {
    expiresIn: 31556926, // 1 year in seconds
  });

  return NextResponse.json(user, { status: 200 });
}
