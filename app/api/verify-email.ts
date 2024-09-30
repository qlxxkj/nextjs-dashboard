// pages/api/verify-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@vercel/postgres';
import fetch from 'node-fetch';
import { insertUser } from '../lib/database';

export default async function verifyEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, code } = req.body;
  const key = `verification_code:${email}`;

  try {
    // 从 Vercel KV 存储中获取存储的验证码
    const response = await fetch(`${process.env.KV_REST_API_URL}/${key}`, {
      headers: {
        'Authorization': `Bearer ${process.env.KV_REST_API_READ_ONLY_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to retrieve verification code: ${await response.text()}`);
    }
    const storedCode = await response.json() as { value: string | null};

    if (storedCode.value && code === storedCode.value) {
      // 验证成功，执行注册逻辑
      const client = createClient({
        connectionString: process.env.POSTGRES_URL,
      });
      const user = await insertUser(email, code); // 假设密码已经加密

      // 删除 Vercel KV 存储中的验证码
      await fetch(`${process.env.KV_REST_API_URL}/${key}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
      });

      res.status(200).json({ message: 'Email verified successfully.' });
    } else {
      res.status(400).json({ error: 'Verification failed.' });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}