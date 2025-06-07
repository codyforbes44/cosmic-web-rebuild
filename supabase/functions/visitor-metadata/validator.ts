
/**
 * Input validation and sanitization for visitor metadata
 */

import type { VisitorData, ValidationResult } from './types.ts';

// Input validation and sanitization
export const validateAndSanitizeInput = (data: any): ValidationResult => {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    errors.push('Invalid data format');
    return { isValid: false, errors };
  }
  
  const sanitized: any = {};
  
  // Validate and sanitize each field
  const stringFields = [
    'page_url', 'referrer', 'user_agent', 'browser_language', 
    'operating_system', 'device_type', 'screen_resolution',
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'
  ];
  
  stringFields.forEach(field => {
    if (data[field] !== undefined) {
      if (typeof data[field] === 'string') {
        // Sanitize and limit length
        let value = data[field].trim().slice(0, 500);
        // Remove potentially dangerous patterns
        value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        value = value.replace(/javascript:/gi, '');
        value = value.replace(/on\w+\s*=/gi, '');
        sanitized[field] = value;
      } else {
        errors.push(`${field} must be a string`);
      }
    }
  });
  
  // Validate numeric fields
  if (data.time_on_page !== undefined) {
    const timeOnPage = parseInt(data.time_on_page);
    if (isNaN(timeOnPage) || timeOnPage < 0 || timeOnPage > 86400000) { // Max 24 hours
      errors.push('Invalid time_on_page value');
    } else {
      sanitized.time_on_page = timeOnPage;
    }
  }
  
  // Validate URL fields more strictly
  if (sanitized.page_url) {
    try {
      const url = new URL(sanitized.page_url);
      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.push('Invalid page_url protocol');
      }
    } catch {
      errors.push('Invalid page_url format');
    }
  }
  
  if (sanitized.referrer && sanitized.referrer !== '') {
    try {
      const url = new URL(sanitized.referrer);
      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.push('Invalid referrer protocol');
      }
    } catch {
      errors.push('Invalid referrer format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitized: errors.length === 0 ? sanitized : undefined,
    errors: errors.length > 0 ? errors : undefined
  };
};
