import { NextResponse } from 'next/server';

export async function GET(req) {
  let data = {
    name: 'Hello, Coz!',
    city: 'bogor',
    random: [{ name: 'lapotp' }, { name: 'fan' }, { name: 'mouse' }],
  };

  return NextResponse.json(data, { status: 400 });
}
