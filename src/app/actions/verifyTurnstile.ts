'use server'

export async function verifyTurnstileToken(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    // Jika tidak ada konfigurasi di env, anggap gagal demi keamanan
    // Namun untuk development lokal biasanya dilewati jika menggunakan Dummy Key Cloudflare
    console.warn('TURNSTILE_SECRET_KEY is not configured');
    return { success: false, message: 'Server not configured' };
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await res.json();
    return { success: data.success === true };
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return { success: false, message: 'Verification failed' };
  }
}
