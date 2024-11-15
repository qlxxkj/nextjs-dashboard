// pages/api/send_verification_code.ts
import { NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {

  try {
    // 1. 解析请求数据
    const body = await request.json().catch(err => {
        console.error('解析请求数据失败:', err);
        throw new Error('Invalid request body');
        });
        
        const { email } = body;
        
        if (!email) {
        return NextResponse.json(
            { error: '邮箱地址不能为空' },
            { status: 400 }
        );
    }

    // 2. 生成验证码
    const verificationCode = Math.floor(10000000 + Math.random() * 90000000); // 生成8位验证码
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 将Date转为字符串格式

    // 3. 存储到数据库
    try {
    await sql`
      INSERT INTO verification_codes (id, email, verification_code, expires_at) 
      VALUES (${uuidv4()}, ${email}, ${verificationCode}, ${expiresAt})
    `;
    } catch (dbError) {
        console.error('数据库操作失败:', dbError);
        return NextResponse.json(
        { error: '数据库操作失败' },
        { status: 500 }
        );
    }

    // 4. 配置邮件服务
    const transporter = createTransport({
        host: 'smtp.gmail.com',  // 明确指定 SMTP 服务器
        port: 587,               // 使用 TLS
        secure: false,           // 使用 STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
    });

    // 5.发送验证码邮件
    try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '您的验证码',
      text: `您的验证码是：${verificationCode}，30分钟内有效。`,
    });

} catch (emailError) {
    console.error('发送邮件失败:', emailError);
    // 如果邮件发送失败，删除之前插入的验证码记录
    await sql`DELETE FROM verification_codes WHERE email = ${email} AND code = ${verificationCode.toString()}`;
    return NextResponse.json(
      { error: '邮件发送失败' },
      { status: 500 }
    );
  }

  return NextResponse.json({ 
    success: true,
    message: '验证码已发送' 
  });

} catch (error) {
  console.error('发送验证码过程中发生错误:', error);
  return NextResponse.json(
    { error: '服务器内部错误' },
    { status: 500 }
  );
}
}
