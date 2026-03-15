const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY

export async function verifyTurnstile(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) {
    // Skip verification in dev when not configured
    return true
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
    }),
  })

  const data = (await response.json()) as { success: boolean }
  return data.success
}
