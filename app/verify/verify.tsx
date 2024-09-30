// pages/verify.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

export default function Verify() {
  const [code, setCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userId = router.query.userId;
    if (!userId) {
      router.push('/signup');
    }
  }, [router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: router.query.userId, code }),
      });
      if (response.ok) {
        router.push('/dashboard');
      } else {
        alert('Verification failed, please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  // 添加计时器逻辑（可选）
  // ...

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={handleInputChange}
          maxLength={1}
          size={1}
        />
        {/* 重复上述 input 8次 */}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}