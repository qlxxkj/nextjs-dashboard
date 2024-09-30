// pages/api/send-verification-code.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

export default async function sendVerificationCode(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email } = req.body;
  const verificationCode = generateVerificationCode();
  const key = `verification_code:${email}`;

  try {
    // 将验证码存储在 Vercel KV 存储中
    const response = await fetch(process.env.KV_REST_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
      body: JSON.stringify({ key, value: verificationCode }),
    });

    if (!response.ok) {
      throw new Error(`Failed to store verification code: ${await response.text()}`);
    }

    // 发送包含验证码的邮件
    const transporter = nodemailer.createTransport({
      service: 'your-email-service',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent to your email.' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function generateVerificationCode() {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}