import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

import User from '@/models/userModel';
import emailType from '@/constants/emailType';

import mailTemplate from './mailTemplate';

async function sendEmail(email: string, _emailType: string, userId: string) {

  try {

    const hashedToken = await bcryptjs.hash(String(userId), 10);

    if (_emailType === emailType.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      });
    } else if (_emailType === emailType.RESET_PASSWORD) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });

    const mailOptions = {
      from: 'ashay@kritin.in',
      to: email,
      subject: _emailType === emailType.VERIFY ? 'Verify your email' : 'Reset your password',
      html: mailTemplate(hashedToken, _emailType)
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default sendEmail;