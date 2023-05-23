import { NextResponse } from 'next/server';
import DB from '../../../lib/db';
import jwt from 'jsonwebtoken';
import transporter from '../../../lib/transporter';
import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';
import AES from 'crypto-js/aes';

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
  const authHeader = req.headers.get("authorization");
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const data = await req;
    // console.log(data)

    try {
      let decoded = jwt.verify(token, process.env.JWT_KEY);
      if(decoded.Role == 'admin') {
        const data = await req.json();

        const user = await DB.Users.create({
          data: {
            NIK: data.NIK,
            NIP: data.NIP,
            Name: data.Name,
            Alamat: data.Alamat,
            Email: data.Email,
            Telp: data.Telp,
            Role : data.Role,
          },
        });

        const ciphertext = AES.encrypt(user.Email, process.env.AUTH_SECRET);
        const cryptToken = encodeURIComponent(ciphertext.toString());

        const __dirname = path.resolve();
        const filePath = path.join(__dirname, 'mail/register_user.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
          url_redirect: process.env.URL_PATH + '/auth/resetPassword/' + cryptToken,
        };
        const htmlToSend = template(replacements);

        const mailData = {
          to: user.Email,
          from: '"MPA - Koperasi Team" <admin@mpa.com>',
          envelope: {
            from: process.env.MAIL_USER,
            to: user.Email,
          },
          subject: `Message From Testing`,
          html: htmlToSend,
        };

        return await transporter
          .sendMail(mailData)
          .then(() => {
            return NextResponse.json('Email Reset Password already sended', {
              status: 200,
            });
          })
          .catch(() => {
            return NextResponse.json('Something Wrong', { status: 400 });
          });
      }
    } catch(err) {
      return NextResponse.json('Something Wrong', { status: 400 });
    }
  }

  return NextResponse.json('something wrong', { status: 400 });
}
