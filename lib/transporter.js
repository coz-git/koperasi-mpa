import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 2525,
  host: 'smtp.elasticemail.com',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: false,
});

export default transporter;
