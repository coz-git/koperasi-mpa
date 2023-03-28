import { NextResponse } from 'next/server';
import * as jose from 'jose';

const KEY = process.env.JWT_KEY;

export async function middleware(req) {
  const token = req.headers.get('authorization');
  if (token) {
    const jwtToken = token.split(' ')[1];
    try {
      const { payload } = await jose.jwtVerify(
        jwtToken,
        new TextEncoder().encode(KEY)
      );

      if (
        req.nextUrl.pathname.startsWith('/api/hello') &&
        payload.Role === 'user'
      ) {
        return NextResponse.next();
      }
      if (
        req.nextUrl.pathname.startsWith('/api/university') &&
        payload.Role === 'admin'
      ) {
        return NextResponse.next();
      }
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 401,
      });
    }
  }
  return new NextResponse(JSON.stringify({ message: 'need authorization' }), {
    status: 401,
  });
}

export const config = {
  matcher: ['/api/hello/:path*', '/api/university/:path*'],
};
