
/**
 * Security utility functions for input sanitization and validation
 */

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/&/g, '&amp;')
    .trim();
};

/**
 * Validate email format with enhanced security
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength with comprehensive rules
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for common weak passwords
  const commonPasswords = ['password', '123456', 'password123', 'admin', 'letmein'];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common. Please choose a more secure password');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

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

/**
 * Clean up authentication state to prevent limbo states
 */
export const cleanupAuthState = () => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    console.error('Error cleaning up auth state:', error);
  }
};

/**
 * Validate profile data before submission
 */
export const validateProfileData = (data: { 
  username?: string; 
  full_name?: string; 
  avatar_url?: string; 
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (data.username) {
    const sanitizedUsername = sanitizeInput(data.username);
    if (sanitizedUsername.length < 3) {
      errors.push('Username must be at least 3 characters long');
    }
    if (sanitizedUsername.length > 30) {
      errors.push('Username must be less than 30 characters');
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(sanitizedUsername)) {
      errors.push('Username can only contain letters, numbers, hyphens, and underscores');
    }
  }
  
  if (data.full_name) {
    const sanitizedName = sanitizeInput(data.full_name);
    if (sanitizedName.length > 100) {
      errors.push('Full name must be less than 100 characters');
    }
    if (!/^[a-zA-Z\s'-]+$/.test(sanitizedName)) {
      errors.push('Full name contains invalid characters');
    }
  }
  
  if (data.avatar_url) {
    try {
      const url = new URL(data.avatar_url);
      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.push('Avatar URL must use HTTP or HTTPS protocol');
      }
    } catch {
      errors.push('Avatar URL must be a valid URL');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate form input length and content
 */
export const validateFormInput = (
  value: string, 
  fieldName: string, 
  minLength: number = 1, 
  maxLength: number = 500
): { isValid: boolean; error?: string } => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const sanitized = sanitizeInput(value.trim());
  
  if (sanitized.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  if (sanitized.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }
  
  return { isValid: true };
};

/**
 * Detect and prevent common injection patterns
 */
export const detectInjection = (input: string): boolean => {
  const injectionPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /expression\s*\(/gi,
    /url\s*\(/gi
  ];
  
  return injectionPatterns.some(pattern => pattern.test(input));
};

/**
 * Enhanced session validation
 */
export const validateSessionSecurity = (): { valid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  
  // Check for suspicious activity indicators
  const suspiciousKeys = Object.keys(localStorage).filter(key => 
    key.includes('injection') || 
    key.includes('exploit') || 
    key.includes('attack')
  );
  
  if (suspiciousKeys.length > 0) {
    warnings.push('Suspicious local storage keys detected');
  }
  
  // Check for rate limit violations
  const rateLimitKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('rate_limit_') && key.includes('_blocked')
  );
  
  if (rateLimitKeys.length > 3) {
    warnings.push('Multiple rate limit violations detected');
  }
  
  return {
    valid: warnings.length === 0,
    warnings
  };
};
