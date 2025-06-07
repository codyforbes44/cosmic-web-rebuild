
/**
 * Rate limiting functionality for visitor metadata endpoint
 */

import type { RateLimitData } from './types.ts';

// Enhanced rate limiting with memory cleanup
const ipRequestCount: Record<string, RateLimitData> = {};

// Clean up old entries periodically
const cleanupOldEntries = () => {
  const now = Date.now();
  const cleanupThreshold = 24 * 60 * 60 * 1000; // 24 hours
  
  Object.keys(ipRequestCount).forEach(key => {
    if (now - ipRequestCount[key].timestamp > cleanupThreshold) {
      delete ipRequestCount[key];
    }
  });
};

// Enhanced rate limiting function
export const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 15; // Reduced from 20 to 15 requests per minute
  const blockDuration = 15 * 60 * 1000; // 15 minute block for violations
  
  // Clean up old entries
  cleanupOldEntries();
  
  // Check if IP is currently blocked
  if (ipRequestCount[ip]?.blocked && now < ipRequestCount[ip].blocked!) {
    return true;
  }
  
  // Initialize or reset if outside window
  if (!ipRequestCount[ip] || now - ipRequestCount[ip].timestamp > windowMs) {
    ipRequestCount[ip] = { count: 1, timestamp: now };
    return false;
  }
  
  // Increment count
  ipRequestCount[ip].count++;
  
  // Check if over limit
  if (ipRequestCount[ip].count > maxRequests) {
    // Block the IP for the block duration
    ipRequestCount[ip].blocked = now + blockDuration;
    return true;
  }
  
  return false;
};
