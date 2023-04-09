import { NextResponse } from 'next/server';
import DB from './../../../../lib/db';
import transporter from '../../../../lib/transporter';
import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';

export async function POST(req) {
  const reqData = await req.json();
  const user = await DB.Users.findFirst({
    where: { Email: reqData.email },
  });

  if (user == null) {
    return NextResponse.json('User Not Found', { status: 400 });
  }

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'mail/reset_password.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    url_redirect: process.env.URL_PATH + '/auth/resetPassword',
  };
  const htmlToSend = template(replacements);

  const mailData = {
    to: 'blastemail17@gmail.com',
    from: '"Example Team" <admin@mpa.com>',
    envelope: {
      from: process.env.MAIL_USER,
      to: 'blastemail17@gmail.com',
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
