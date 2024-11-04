// pages/verify_code.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const VerifyCode = () => {
  const router = useRouter();
  const { email } = router.query;

  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      router.push('/signup'); // 如果没有邮箱信息，重定向到注册页面
    }
  }, [email, router]);

  const handleVerify = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/verify_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: parseInt(code), password }),
      });

      if (response.ok) {
        // 验证成功，跳转到 dashboard
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || '验证失败');
      }
    } catch (error) {
      console.error(error);
      setError('验证失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>输入验证码</h2>
      <p>验证码已发送至 {email}</p>
      <input
        type="text"
        placeholder="验证码"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? '验证中...' : '提交'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyCode;
