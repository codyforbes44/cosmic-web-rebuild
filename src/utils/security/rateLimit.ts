
/**
 * Rate limiting utilities
 */

/**
 * Enhanced rate limiting utility with persistent storage
 */
export const checkRateLimit = (
  key: string, 
  maxAttempts: number = 5, 
  windowMs: number = 15 * 60 * 1000,
  blockDuration: number = 60 * 60 * 1000 // 1 hour block
): { allowed: boolean; remainingAttempts: number; blockedUntil?: number } => {
  const now = Date.now();
  const storageKey = `rate_limit_${key}`;
  
  try {
    const storedData = localStorage.getItem(storageKey);
    let attempts: number[] = storedData ? JSON.parse(storedData) : [];
    
    // Check if currently blocked
    const blockKey = `${storageKey}_blocked`;
    const blockedUntil = localStorage.getItem(blockKey);
    if (blockedUntil && now < parseInt(blockedUntil)) {
      return { 
        allowed: false, 
        remainingAttempts: 0, 
        blockedUntil: parseInt(blockedUntil) 
      };
    }
    
    // Remove old attempts outside the window
    attempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (attempts.length >= maxAttempts) {
      // Block the user
      const blockUntil = now + blockDuration;
      localStorage.setItem(blockKey, blockUntil.toString());
      return { 
        allowed: false, 
        remainingAttempts: 0, 
        blockedUntil: blockUntil 
      };
    }
    
    // Add current attempt
    attempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(attempts));
    
    return { 
      allowed: true, 
      remainingAttempts: maxAttempts - attempts.length 
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open but log the error
    return { allowed: true, remainingAttempts: maxAttempts };
  }
};
