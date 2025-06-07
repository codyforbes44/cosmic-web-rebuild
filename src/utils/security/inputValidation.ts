
/**
 * Input validation and sanitization utilities
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
