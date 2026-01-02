/**
 * Consolidated Security Module
 * 
 * This module provides comprehensive security utilities for:
 * - Input validation and sanitization
 * - Rate limiting with tiered penalties
 * - Password validation
 * - Authentication security
 * - Session validation
 * - Security event logging
 * - Content Security Policy
 */

import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

// ============================================================================
// INPUT VALIDATION & SANITIZATION
// ============================================================================

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
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
    if (!/^[a-zA-Z0-9_-]+$/.test(data.username)) {
      errors.push('Username can only contain letters, numbers, hyphens, and underscores');
    }
  }
  
  if (data.full_name) {
    if (data.full_name.length > 100) {
      errors.push('Full name must be less than 100 characters');
    }
    if (!/^[a-zA-Z\s'-]+$/.test(data.full_name)) {
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
  
  return { isValid: errors.length === 0, errors };
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
  
  const trimmed = value.trim();
  
  if (trimmed.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  if (trimmed.length > maxLength) {
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
 * Enhanced input validation with comprehensive security checks
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
  
  if (options.requireSanitization !== false) {
    sanitized = sanitizeInput(input);
  }
  
  if (options.maxLength && sanitized.length > options.maxLength) {
    violations.push(`Input exceeds maximum length of ${options.maxLength}`);
  }
  
  if (options.minLength && sanitized.length < options.minLength) {
    violations.push(`Input is shorter than minimum length of ${options.minLength}`);
  }
  
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
  
  if (detectInjection(input)) {
    violations.push('Input contains potentially malicious content');
  }
  
  return { isValid: violations.length === 0, sanitized, violations };
};

// ============================================================================
// PASSWORD VALIDATION
// ============================================================================

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'fair' | 'good' | 'strong';
  score: number;
}

/**
 * Validate password strength with comprehensive checks
 */
export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  let score = 0;
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    score += 1;
  }
  
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    score += 1;
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    score += 1;
  }
  
  // Check for common patterns
  const commonPatterns = [
    /^12345/,
    /password/i,
    /qwerty/i,
    /abc123/i,
    /(.)\1{3,}/ // Repeated characters
  ];
  
  if (commonPatterns.some(pattern => pattern.test(password))) {
    errors.push('Password contains common patterns that are easy to guess');
    score = Math.max(0, score - 2);
  }
  
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
  if (score >= 6) strength = 'strong';
  else if (score >= 4) strength = 'good';
  else if (score >= 2) strength = 'fair';
  
  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score
  };
};

// ============================================================================
// RATE LIMITING
// ============================================================================

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  blockedUntil?: number;
  tier?: number;
}

/**
 * Check rate limit for an action
 */
export const checkRateLimit = (
  key: string, 
  maxAttempts: number = 5, 
  windowMs: number = 15 * 60 * 1000,
  blockDuration: number = 60 * 60 * 1000
): RateLimitResult => {
  const now = Date.now();
  const storageKey = `rate_limit_${key}`;
  
  try {
    const storedData = localStorage.getItem(storageKey);
    let attempts: number[] = storedData ? JSON.parse(storedData) : [];
    
    const blockKey = `${storageKey}_blocked`;
    const blockedUntil = localStorage.getItem(blockKey);
    if (blockedUntil && now < parseInt(blockedUntil)) {
      return { 
        allowed: false, 
        remainingAttempts: 0, 
        blockedUntil: parseInt(blockedUntil) 
      };
    }
    
    attempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (attempts.length >= maxAttempts) {
      const blockUntil = now + blockDuration;
      localStorage.setItem(blockKey, blockUntil.toString());
      return { allowed: false, remainingAttempts: 0, blockedUntil: blockUntil };
    }
    
    attempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(attempts));
    
    return { allowed: true, remainingAttempts: maxAttempts - attempts.length };
  } catch (error) {
    logger.error('Rate limiting error', error instanceof Error ? error : new Error(String(error)));
    return { allowed: true, remainingAttempts: maxAttempts };
  }
};

/**
 * Advanced rate limiting with progressive penalties (tiered)
 */
export const advancedRateLimit = (
  key: string,
  tier1: { attempts: number; window: number; penalty: number } = { attempts: 5, window: 60000, penalty: 300000 },
  tier2: { attempts: number; window: number; penalty: number } = { attempts: 3, window: 300000, penalty: 3600000 }
): RateLimitResult => {
  const now = Date.now();
  
  try {
    const tier2BlockKey = `${key}_tier2_blocked`;
    const tier2Block = localStorage.getItem(tier2BlockKey);
    if (tier2Block && now < parseInt(tier2Block)) {
      return { allowed: false, remainingAttempts: 0, blockedUntil: parseInt(tier2Block), tier: 2 };
    }

    const tier1BlockKey = `${key}_tier1_blocked`;
    const tier1Block = localStorage.getItem(tier1BlockKey);
    if (tier1Block && now < parseInt(tier1Block)) {
      return { allowed: false, remainingAttempts: 0, blockedUntil: parseInt(tier1Block), tier: 1 };
    }

    const tier1Key = `${key}_tier1`;
    const tier2Key = `${key}_tier2`;
    
    const tier1Data = localStorage.getItem(tier1Key);
    const tier2Data = localStorage.getItem(tier2Key);
    
    let tier1Attempts: number[] = tier1Data ? JSON.parse(tier1Data) : [];
    let tier2Attempts: number[] = tier2Data ? JSON.parse(tier2Data) : [];
    
    tier1Attempts = tier1Attempts.filter(timestamp => now - timestamp < tier1.window);
    tier2Attempts = tier2Attempts.filter(timestamp => now - timestamp < tier2.window);
    
    if (tier2Attempts.length >= tier2.attempts) {
      const blockUntil = now + tier2.penalty;
      localStorage.setItem(tier2BlockKey, blockUntil.toString());
      return { allowed: false, remainingAttempts: 0, blockedUntil: blockUntil, tier: 2 };
    }
    
    if (tier1Attempts.length >= tier1.attempts) {
      const blockUntil = now + tier1.penalty;
      localStorage.setItem(tier1BlockKey, blockUntil.toString());
      tier2Attempts.push(now);
      localStorage.setItem(tier2Key, JSON.stringify(tier2Attempts));
      return { allowed: false, remainingAttempts: 0, blockedUntil: blockUntil, tier: 1 };
    }
    
    tier1Attempts.push(now);
    localStorage.setItem(tier1Key, JSON.stringify(tier1Attempts));
    
    return { allowed: true, remainingAttempts: tier1.attempts - tier1Attempts.length, tier: 0 };
  } catch (error) {
    logger.error('Advanced rate limiting error', error instanceof Error ? error : new Error(String(error)));
    return { allowed: true, remainingAttempts: 5, tier: 0 };
  }
};

// ============================================================================
// AUTHENTICATION SECURITY
// ============================================================================

/**
 * Clean up authentication state to prevent limbo states
 */
export const cleanupAuthState = () => {
  try {
    localStorage.removeItem('supabase.auth.token');
    
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    logger.error('Error cleaning up auth state', error instanceof Error ? error : new Error(String(error)));
  }
};

/**
 * Enhanced session validation
 */
export const validateSessionSecurity = (): { valid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  
  const suspiciousKeys = Object.keys(localStorage).filter(key => 
    key.includes('injection') || 
    key.includes('exploit') || 
    key.includes('attack')
  );
  
  if (suspiciousKeys.length > 0) {
    warnings.push('Suspicious local storage keys detected');
  }
  
  const rateLimitKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('rate_limit_') && key.includes('_blocked')
  );
  
  if (rateLimitKeys.length > 3) {
    warnings.push('Multiple rate limit violations detected');
  }
  
  return { valid: warnings.length === 0, warnings };
};

/**
 * Validate current session with Supabase
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
    
    const now = Date.now() / 1000;
    if (session.expires_at && session.expires_at < now) {
      return { valid: false, reason: 'Session expired' };
    }
    
    if (!session.access_token || !session.refresh_token) {
      return { valid: false, reason: 'Invalid session tokens' };
    }
    
    return { valid: true };
  } catch (error) {
    logger.error('Session validation error', error instanceof Error ? error : new Error(String(error)));
    return { valid: false, reason: 'Session validation failed' };
  }
};

// ============================================================================
// SECURITY EVENT LOGGING
// ============================================================================

export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface SecurityEvent {
  event: string;
  severity: SecurityEventSeverity;
  timestamp: string;
  userAgent: string;
  details: Record<string, unknown>;
}

/**
 * Security event logger with local storage
 */
export const securityLogger = {
  log: (
    event: string,
    details: Record<string, unknown> = {},
    severity: SecurityEventSeverity = 'medium'
  ) => {
    try {
      const timestamp = new Date().toISOString();
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
      
      logger.warn(`[SECURITY ${severity.toUpperCase()}] ${event}`, { timestamp, userAgent, ...details });
      
      const logKey = `security_logs_${new Date().toDateString()}`;
      const existingLogs = localStorage.getItem(logKey);
      const logs: SecurityEvent[] = existingLogs ? JSON.parse(existingLogs) : [];
      
      logs.push({ event, severity, timestamp, userAgent, details });
      
      if (logs.length > 50) {
        logs.splice(0, logs.length - 50);
      }
      
      localStorage.setItem(logKey, JSON.stringify(logs));
    } catch (error) {
      logger.error('Failed to log security event', error instanceof Error ? error : new Error(String(error)));
    }
  },
  
  getLogs: (date?: Date): SecurityEvent[] => {
    try {
      const logKey = `security_logs_${(date || new Date()).toDateString()}`;
      const logs = localStorage.getItem(logKey);
      return logs ? JSON.parse(logs) : [];
    } catch {
      return [];
    }
  },
  
  clearLogs: (date?: Date) => {
    const logKey = `security_logs_${(date || new Date()).toDateString()}`;
    localStorage.removeItem(logKey);
  }
};

// Backward compatibility alias
export const logSecurityEvent = securityLogger.log;

// ============================================================================
// CONTENT SECURITY POLICY
// ============================================================================

/**
 * Apply CSP headers via meta tags (for SPA)
 */
export const applyCSPHeaders = () => {
  const cspContent = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://ai.gateway.lovable.dev https://api.openai.com https://api.anthropic.com https://api-inference.huggingface.co",
    "frame-src 'self' https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ');
  
  const existingMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (existingMeta) {
    existingMeta.setAttribute('content', cspContent);
  } else {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = cspContent;
    document.head.appendChild(meta);
  }
};

/**
 * Initialize all security headers
 */
export const initializeSecurityHeaders = () => {
  applyCSPHeaders();
  
  // Add other security-related meta tags
  const securityMetas = [
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-Frame-Options', content: 'SAMEORIGIN' },
    { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' }
  ];
  
  securityMetas.forEach(({ httpEquiv, content }) => {
    if (!document.querySelector(`meta[http-equiv="${httpEquiv}"]`)) {
      const meta = document.createElement('meta');
      meta.httpEquiv = httpEquiv;
      meta.content = content;
      document.head.appendChild(meta);
    }
  });
};
