import { NextResponse } from 'next/server';
import DB from './../../../../lib/db';
import transporter from '../../../../lib/transporter';

export async function POST(req) {
  const reqData = await req.json();
  const user = await DB.Users.findFirst({
    where: { Email: reqData.email },
  });

  if (user == null) {
    return NextResponse.json('User Not Found', { status: 400 });
  }

  const mailData = {
    to: 'blastemail17@gmail.com',
    from: '"Example Team" <admin@mpa.com>',
    envelope: {
      from: process.env.MAIL_USER,
      to: 'blastemail17@gmail.com',
    },
    subject: `Message From Testing`,
    text: 'Hi! | Sent from: Coz',
    html: `<div>Hi!</div><p>Sent from:
    Coz</p>`,
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
