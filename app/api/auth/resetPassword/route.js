import { NextResponse } from 'next/server';
import DB from './../../../../lib/db';
import { enc, SHA512 } from 'crypto-js';
import AES from 'crypto-js/aes';

export async function POST(req) {
  try {
    const reqData = await req.json();

    const decodedStr = decodeURIComponent(reqData.key);
    const keyData = AES.decrypt(decodedStr, process.env.AUTH_SECRET).toString(
      enc.Utf8
    );

    const user = await DB.Users.findFirst({
      where: { Email: keyData },
    });

    if (user == null) {
      return NextResponse.json('Something Wrong', { status: 400 });
    }

    var urlDecoded = decodeURIComponent(reqData.password);
    var base64Decoded = enc.Base64.parse(urlDecoded);
    var hashedPassword = SHA512(base64Decoded).toString(enc.Hex);

    await DB.Users.update({
      where: {
        UserId: user.UserId,
      },
      data: {
        Password: hashedPassword,
      },
    });

    return NextResponse.json('Oke', {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(e.message, {
      status: 400,
    });
  }
}
