import nodemailer from 'nodemailer';
import 'dotenv/config';

const mailService = {
    async sendEmail( emailTo, emailSubject, emailText ) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail( {
        from:process.env.SMTP_USER ,
        to: emailTo,
        subject: emailSubject,
        text: emailText,
      });
    },
  };
  
  Object.freeze(mailService);
  
  // module.exports = {
  //   mailService,
  // };

export default mailService;