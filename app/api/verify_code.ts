// pages/api/verify_code.ts
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next';

interface VerifyRequestBody {
  email: string;
  code: number;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '仅支持POST请求' });
  }

  const { email, code, password }: VerifyRequestBody = req.body;

  try {
    // 查询验证码，确保它存在且未过期
    const { rows } = await sql`
      SELECT * FROM verification_codes 
      WHERE email = ${email} 
        AND verification_code = ${code} 
        AND expires_at > NOW()
    `;

    if (rows.length === 0) {
      return res.status(400).json({ message: '验证码错误或已过期' });
    }

    // 插入用户信息到 users 表
    await sql`
      INSERT INTO users (id, email, password) 
      VALUES (${uuidv4()}, ${email}, ${password})
    `;

    res.status(200).json({ message: '验证成功，用户已注册并登录' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '验证失败' });
  }
}
