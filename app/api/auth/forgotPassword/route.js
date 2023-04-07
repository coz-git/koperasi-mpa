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
    from: 'sultankosasih@gmail.com',
    subject: `Message From Testing`,
    text: 'Hi! | Sent from: Coz',
    html: `<div>Hi!</div><p>Sent from:
    Coz</p>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else {
      console.log(info);
    }
  });
  return NextResponse.json(user, { status: 200 });
}
