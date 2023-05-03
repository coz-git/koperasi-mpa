import { NextResponse } from 'next/server';
import DB from './../../../../lib/db';
import jwt from 'jsonwebtoken';
import { enc, SHA512 } from 'crypto-js';
import AES from 'crypto-js/aes';

const KEY = process.env.JWT_KEY;

export async function POST(req) {
  const reqData = await req.json();
  const user = await DB.Users.findFirst({
    where: { Email: reqData.email },
  });

  if (user == null) {
    return NextResponse.json('User Not Found', { status: 400 });
  }

  var urlDecoded = decodeURIComponent(reqData.password);
  var base64Decoded = enc.Base64.parse(urlDecoded);
  var hashedPassword = SHA512(base64Decoded).toString(enc.Hex);

  if (user.Password != hashedPassword) {
    return NextResponse.json('Invalid User and Password', { status: 400 });
  }

  let returnUserData = {
    Role: user.Role,
    Email: user.Email,
    UserId: user.UserId,
    Token: user.accessToken,
  }

  /* Sign token */
  returnUserData.accessToken = jwt.sign(returnUserData, KEY, {
    expiresIn: 31556926, // 1 year in seconds
  });

  return NextResponse.json(returnUserData, { status: 200 });
}
