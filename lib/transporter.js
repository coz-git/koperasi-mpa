import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 2525,
  host: 'smtp.elasticemail.com',
  auth: {
    user: 'sultankosasih@gmail.com',
    pass: process.env.MAIL_PASSWORD,
  },
  secure: false,
  tls: {
    ciphers: 'SSLv3',
  },
});

export default transporter;
