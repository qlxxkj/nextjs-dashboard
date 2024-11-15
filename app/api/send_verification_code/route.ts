export async function sendVerificationCode(email: string) {
    try {
      const response = await fetch('/api/send_verification_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send verification code');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error sending code:', error);
      throw error;
    }
  }