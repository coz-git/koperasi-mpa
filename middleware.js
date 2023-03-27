import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.headers.get('authorization');
  if (token) {
    const auth = token.split(' ')[1];
    // console.log(auth);
  }
  return NextResponse.next();
}
