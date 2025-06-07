
/**
 * Type definitions for visitor metadata functionality
 */

export interface VisitorData {
  page_url?: string;
  referrer?: string;
  user_agent?: string;
  browser_language?: string;
  operating_system?: string;
  device_type?: string;
  screen_resolution?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  time_on_page?: number;
}

export interface GeoData {
  country: string | null;
  region: string | null;
  city: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  sanitized?: any;
  errors?: string[];
}

export interface RateLimitData {
  count: number;
  timestamp: number;
  blocked?: number;
}
