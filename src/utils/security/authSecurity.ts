
/**
 * Authentication security utilities
 */

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
