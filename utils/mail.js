import nodemailer from 'nodemailer';
export function mailer(){
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: Number(process.env.MAIL_PORT || 2525),
    auth: { user: process.env.MAIL_USER || 'user', pass: process.env.MAIL_PASS || 'pass' }
  });
  return transport;
}
export async function sendTicketEmail({to, subject='Your Ticket', html}){
  const from = process.env.MAIL_FROM || 'tickets@example.com';
  const transport = mailer();
  const info = await transport.sendMail({ from, to, subject, html });
  console.log('Ticket email sent:', info.messageId);
  return info;
}
