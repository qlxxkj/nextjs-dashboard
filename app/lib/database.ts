import { createClient } from '@vercel/postgres';

// 创建数据库客户端
const client = createClient({
  connectionString: process.env.POSTGRES_URL,
});

export async function insertUser(email: string, password: string) {
  const query = `
    INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email;
  `;
  const { rows } = await client.query(query, [email, password]);
  return rows[0];
}