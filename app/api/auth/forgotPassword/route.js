import { NextResponse } from 'next/server';
import DB from './../../../../lib/db';

export async function POST(req) {
  const reqData = await req.json();
  const user = await DB.Users.findFirst({
    where: { Email: reqData.email },
  });

  if (user == null) {
    return NextResponse.json('User Not Found', { status: 400 });
  }

  return NextResponse.json(user, { status: 200 });
}
