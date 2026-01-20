/**
 * Shared Rate Limiter for Edge Functions
 * Provides IP-based and user-based rate limiting
 */

interface RateLimitData {
  count: number;
  timestamp: number;
  blocked?: number;
}

// In-memory storage for rate limiting
const ipRequestCount: Record<string, RateLimitData> = {};
const userRequestCount: Record<string, RateLimitData> = {};

// Clean up old entries periodically
const cleanupOldEntries = (storage: Record<string, RateLimitData>) => {
  const now = Date.now();
  const cleanupThreshold = 24 * 60 * 60 * 1000; // 24 hours
  
  Object.keys(storage).forEach(key => {
    if (now - storage[key].timestamp > cleanupThreshold) {
      delete storage[key];
    }
  });
};

interface RateLimitConfig {
  windowMs?: number;      // Time window in milliseconds
  maxRequests?: number;   // Max requests per window
  blockDuration?: number; // Block duration in milliseconds
}

/**
 * Check if an IP is rate limited
 */
export const isIpRateLimited = (
  ip: string, 
  config: RateLimitConfig = {}
): boolean => {
  const {
    windowMs = 60 * 1000,        // 1 minute window
    maxRequests = 20,             // 20 requests per minute
    blockDuration = 5 * 60 * 1000 // 5 minute block
  } = config;
  
  return checkRateLimit(ip, ipRequestCount, windowMs, maxRequests, blockDuration);
};

/**
 * Check if a user is rate limited
 */
export const isUserRateLimited = (
  userId: string,
  config: RateLimitConfig = {}
): boolean => {
  const {
    windowMs = 60 * 1000,         // 1 minute window
    maxRequests = 30,              // 30 requests per minute for authenticated users
    blockDuration = 2 * 60 * 1000  // 2 minute block
  } = config;
  
  return checkRateLimit(userId, userRequestCount, windowMs, maxRequests, blockDuration);
};

/**
 * Internal rate limit check
 */
const checkRateLimit = (
  key: string,
  storage: Record<string, RateLimitData>,
  windowMs: number,
  maxRequests: number,
  blockDuration: number
): boolean => {
  const now = Date.now();
  
  // Clean up old entries
  cleanupOldEntries(storage);
  
  // Check if key is currently blocked
  if (storage[key]?.blocked && now < storage[key].blocked!) {
    return true;
  }
  
  // Initialize or reset if outside window
  if (!storage[key] || now - storage[key].timestamp > windowMs) {
    storage[key] = { count: 1, timestamp: now };
    return false;
  }
  
  // Increment count
  storage[key].count++;
  
  // Check if over limit
  if (storage[key].count > maxRequests) {
    // Block for the block duration
    storage[key].blocked = now + blockDuration;
    return true;
  }
  
  return false;
};

/**
 * Extract client IP from request headers
 */
export const extractClientIp = (req: Request): string => {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         req.headers.get('x-real-ip') ||
         req.headers.get('cf-connecting-ip') ||
         'unknown';
};

/**
 * Create a rate limit exceeded response
 */
export const rateLimitResponse = (corsHeaders: Record<string, string>) => {
  return new Response(
    JSON.stringify({ 
      error: 'Rate limit exceeded. Please wait a moment before trying again.',
      type: 'rate_limit_error',
      retryAfter: 60
    }), 
    {
      status: 429,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Retry-After': '60'
      },
    }
  );
};
