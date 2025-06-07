import { supabase } from '@/integrations/supabase/client';

/**
 * Enhanced security utilities with additional validation and monitoring
 */

/**
 * Advanced rate limiting with progressive penalties
 */
export const advancedRateLimit = (
  key: string,
  tier1: { attempts: number; window: number; penalty: number } = { attempts: 5, window: 60000, penalty: 300000 },
  tier2: { attempts: number; window: number; penalty: number } = { attempts: 3, window: 300000, penalty: 3600000 }
): { allowed: boolean; remainingAttempts: number; blockedUntil?: number; tier: number } => {
  const now = Date.now();
  
  try {
    // Check tier 2 block (severe violations)
    const tier2BlockKey = `${key}_tier2_blocked`;
    const tier2Block = localStorage.getItem(tier2BlockKey);
    if (tier2Block && now < parseInt(tier2Block)) {
      return { allowed: false, remainingAttempts: 0, blockedUntil: parseInt(tier2Block), tier: 2 };
    }

    // Check tier 1 block
    const tier1BlockKey = `${key}_tier1_blocked`;
    const tier1Block = localStorage.getItem(tier1BlockKey);
    if (tier1Block && now < parseInt(tier1Block)) {
      return { allowed: false, remainingAttempts: 0, blockedUntil: parseInt(tier1Block), tier: 1 };
    }

    // Track attempts for both tiers
    const tier1Key = `${key}_tier1`;
    const tier2Key = `${key}_tier2`;
    
    const tier1Data = localStorage.getItem(tier1Key);
    const tier2Data = localStorage.getItem(tier2Key);
    
    let tier1Attempts: number[] = tier1Data ? JSON.parse(tier1Data) : [];
    let tier2Attempts: number[] = tier2Data ? JSON.parse(tier2Data) : [];
    
    // Clean old attempts
    tier1Attempts = tier1Attempts.filter(timestamp => now - timestamp < tier1.window);
    tier2Attempts = tier2Attempts.filter(timestamp => now - timestamp < tier2.window);
    
    // Check tier 2 violations first (more severe)
    if (tier2Attempts.length >= tier2.attempts) {
      const blockUntil = now + tier2.penalty;
      localStorage.setItem(tier2BlockKey, blockUntil.toString());
      return { allowed: false, remainingAttempts: 0, blockedUntil: blockUntil, tier: 2 };
    }
    
    // Check tier 1 violations
    if (tier1Attempts.length >= tier1.attempts) {
      const blockUntil = now + tier1.penalty;
      localStorage.setItem(tier1BlockKey, blockUntil.toString());
      // Escalate to tier 2 tracking
      tier2Attempts.push(now);
      localStorage.setItem(tier2Key, JSON.stringify(tier2Attempts));
      return { allowed: false, remainingAttempts: 0, blockedUntil: blockUntil, tier: 1 };
    }
    
    // Add current attempt
    tier1Attempts.push(now);
    localStorage.setItem(tier1Key, JSON.stringify(tier1Attempts));
    
    return { 
      allowed: true, 
      remainingAttempts: tier1.attempts - tier1Attempts.length,
      tier: 0
    };
  } catch (error) {
    console.error('Advanced rate limiting error:', error);
    return { allowed: true, remainingAttempts: 5, tier: 0 };
  }
};

/**
 * Enhanced input validation with security patterns
 */
export const enhancedInputValidation = (
  input: string,
  options: {
    maxLength?: number;
    minLength?: number;
    allowedPatterns?: RegExp[];
    blockedPatterns?: RegExp[];
    requireSanitization?: boolean;
  } = {}
): { isValid: boolean; sanitized: string; violations: string[] } => {
  const violations: string[] = [];
  let sanitized = input;
  
  // Basic sanitization if required
  if (options.requireSanitization !== false) {
    sanitized = input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .trim();
  }
  
  // Length validation
  if (options.maxLength && sanitized.length > options.maxLength) {
    violations.push(`Input exceeds maximum length of ${options.maxLength}`);
  }
  
  if (options.minLength && sanitized.length < options.minLength) {
    violations.push(`Input is shorter than minimum length of ${options.minLength}`);
  }
  
  // Pattern validation
  if (options.allowedPatterns) {
    const matches = options.allowedPatterns.some(pattern => pattern.test(sanitized));
    if (!matches) {
      violations.push('Input does not match allowed patterns');
    }
  }
  
  if (options.blockedPatterns) {
    const hasBlocked = options.blockedPatterns.some(pattern => pattern.test(sanitized));
    if (hasBlocked) {
      violations.push('Input contains blocked patterns');
    }
  }
  
  // Security pattern detection
  const securityPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /expression\s*\(/gi
  ];
  
  const hasSecurityViolation = securityPatterns.some(pattern => pattern.test(input));
  if (hasSecurityViolation) {
    violations.push('Input contains potentially malicious content');
  }
  
  return {
    isValid: violations.length === 0,
    sanitized,
    violations
  };
};

/**
 * Session security validator
 */
export const validateSession = async (): Promise<{ valid: boolean; reason?: string }> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      return { valid: false, reason: 'Session validation error' };
    }
    
    if (!session) {
      return { valid: false, reason: 'No active session' };
    }
    
    // Check if session is expired
    const now = Date.now() / 1000;
    if (session.expires_at && session.expires_at < now) {
      return { valid: false, reason: 'Session expired' };
    }
    
    // Validate token structure
    if (!session.access_token || !session.refresh_token) {
      return { valid: false, reason: 'Invalid session tokens' };
    }
    
    return { valid: true };
  } catch (error) {
    console.error('Session validation error:', error);
    return { valid: false, reason: 'Session validation failed' };
  }
};

/**
 * Security event logger
 */
export const logSecurityEvent = async (
  event: string,
  details: Record<string, any> = {},
  severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
) => {
  try {
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;
    
    // Log to console for debugging
    console.warn(`[SECURITY ${severity.toUpperCase()}] ${event}:`, {
      timestamp,
      userAgent,
      ...details
    });
    
    // In a production environment, you would send this to your logging service
    // For now, we'll store it locally for debugging
    const logKey = `security_logs_${new Date().toDateString()}`;
    const existingLogs = localStorage.getItem(logKey);
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    
    logs.push({
      event,
      severity,
      timestamp,
      userAgent,
      details
    });
    
    // Keep only last 50 logs per day
    if (logs.length > 50) {
      logs.splice(0, logs.length - 50);
    }
    
    localStorage.setItem(logKey, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};
