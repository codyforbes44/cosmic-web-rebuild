/**
 * Analytics Type Definitions
 * Provides type safety for analytics data and charts
 */

// Chart Data Types
export interface DailyVisitorData {
  date: string;
  count: number;
}

export interface DeviceData {
  name: string;
  value: number;
}

export interface CountryData {
  name: string;
  value: number;
  code?: string;
}

export interface SourceData {
  name: string;
  value: number;
  category?: 'organic' | 'paid' | 'social' | 'referral' | 'direct';
}

// Visitor Record
export interface VisitorRecord {
  id: string;
  visit_timestamp: string | null;
  page_url: string | null;
  referrer: string | null;
  device_type: string | null;
  browser_language: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  operating_system: string | null;
  screen_resolution: string | null;
  user_agent: string | null;
  time_on_page: number | null;
  ip_address: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

// Analytics Summary
export interface AnalyticsSummary {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
  topCountries: CountryData[];
  topSources: SourceData[];
  deviceBreakdown: DeviceData[];
}

// Chart Configuration
export interface ChartConfig {
  showLegend?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  colors?: string[];
}
