// pages/api/send_verification_code.ts
import { v4 as uuidv4 } from 'uuid';
import { createTransport } from 'nodemailer';
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '仅支持POST请求' });
  }

  const { email, password }: RequestBody = req.body;
  const verificationCode = Math.floor(10000000 + Math.random() * 90000000); // 生成8位验证码
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 将Date转为字符串格式

  try {
    // 使用 Vercel Postgres 插入验证码
    await sql`
      INSERT INTO verification_codes (id, email, verification_code, expires_at) 
      VALUES (${uuidv4()}, ${email}, ${verificationCode}, ${expiresAt})
    `;

    // 配置邮件服务
    const transporter = createTransport({
      service: 'Gmail', // 使用其他服务商请修改此处
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 发送验证码邮件
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '您的验证码',
      text: `您的验证码是：${verificationCode}，30分钟内有效。`,
    });

    res.status(200).json({ message: '验证码已发送至您的邮箱' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '发送验证码失败' });
  }
}
