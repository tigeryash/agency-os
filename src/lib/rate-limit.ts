import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

function createRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    prefix: 'agency:ratelimit',
  })
}

let rateLimiter: Ratelimit | null | undefined

export async function checkRateLimit(identifier: string): Promise<{ success: boolean }> {
  if (rateLimiter === undefined) {
    rateLimiter = createRateLimiter()
  }

  // If no Redis configured, allow all requests (dev mode)
  if (!rateLimiter) return { success: true }

  const result = await rateLimiter.limit(identifier)
  return { success: result.success }
}
