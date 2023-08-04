import { NextResponse } from 'next/server';
import DB from '../../../../lib/db';

export async function GET(req) {
  console.log(req)

  return NextResponse.json('something wrong', { status: 400 });
  
}