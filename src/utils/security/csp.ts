/**
 * Content Security Policy utilities for enhanced security
 */

/**
 * Apply Content Security Policy headers to prevent XSS attacks
 */
export const applyCSPHeaders = () => {
  // Only apply in browser environment
  if (typeof document !== 'undefined') {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.elevenlabs.io",
      "media-src 'self' https: blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    
    // Remove existing CSP meta tag if present
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCSP) {
      existingCSP.remove();
    }
    
    document.head.appendChild(meta);
  }
};

/**
 * Initialize security headers on app startup
 */
export const initializeSecurityHeaders = () => {
  applyCSPHeaders();
  
  // Additional security headers via meta tags (only those supported)
  if (typeof document !== 'undefined') {
    // Referrer Policy (this one is supported via meta tag)
    const referrerPolicy = document.createElement('meta');
    referrerPolicy.name = 'referrer';
    referrerPolicy.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(referrerPolicy);
  }
};