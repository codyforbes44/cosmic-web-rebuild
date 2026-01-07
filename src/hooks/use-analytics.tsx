/**
 * Analytics Hook
 * 
 * Uses the centralized query factory for consistent data fetching.
 * Processes raw visitor data into aggregated analytics.
 */

import { useMemo } from "react";
import { useVisitorAnalyticsQuery } from "@/lib/queries/hooks";

export interface AnalyticsData {
  visitorData: any[];
  dailyVisitors: VisitorCount[];
  deviceData: DeviceData[];
  countryData: CountryData[];
  sourceData: SourceData[];
  totalVisitors: number;
  totalCountries: number;
  avgTimeOnPage: number;
  topPage: string;
}

export interface VisitorCount {
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
}

export interface SourceData {
  name: string;
  value: number;
}

export const useAnalytics = (days: number = 90) => {
  const { 
    data: visitors = [], 
    isLoading: loading, 
    error: queryError,
    refetch,
  } = useVisitorAnalyticsQuery(days);

  // Process the raw visitor data into analytics
  const data = useMemo<AnalyticsData | null>(() => {
    if (visitors.length === 0) {
      return {
        visitorData: [],
        dailyVisitors: generateEmptyDailyData(days),
        deviceData: [],
        countryData: [],
        sourceData: [],
        totalVisitors: 0,
        totalCountries: 0,
        avgTimeOnPage: 0,
        topPage: '/'
      };
    }

    // Process daily visitors
    const dailyData = processDailyVisitors(visitors, days);
    
    // Process device data
    const deviceData = processDeviceData(visitors);
    
    // Process country data
    const countryData = processCountryData(visitors);
    
    // Process source data (UTM and referrer)
    const sourceData = processSourceData(visitors);
    
    // Calculate aggregated metrics
    const totalVisitors = visitors.length;
    const totalCountries = calculateUniqueCountries(visitors);
    const avgTimeOnPage = calculateAverageTimeOnPage(visitors);
    const topPage = findMostPopularPage(visitors);

    return {
      visitorData: visitors,
      dailyVisitors: dailyData,
      deviceData,
      countryData,
      sourceData,
      totalVisitors,
      totalCountries,
      avgTimeOnPage,
      topPage
    };
  }, [visitors, days]);

  const error = queryError ? (queryError as Error).message : null;

  return { data, loading, error, refetch };
};

// Helper functions for data processing
function generateEmptyDailyData(days: number = 90): VisitorCount[] {
  const dailyData: VisitorCount[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dailyData.push({ date: dateStr, count: 0 });
  }
  
  return dailyData;
}

function processDailyVisitors(visitors: any[], days: number = 90): VisitorCount[] {
  const now = new Date();
  const dailyData: VisitorCount[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const count = visitors.filter(v => {
      if (!v.visit_timestamp) return false;
      const visitDate = new Date(v.visit_timestamp).toISOString().split('T')[0];
      return visitDate === dateStr;
    }).length;
    
    dailyData.push({ date: dateStr, count });
  }
  
  return dailyData;
}

function processDeviceData(visitors: any[]): DeviceData[] {
  const devices: {[key: string]: number} = {};
  
  visitors.forEach((visitor) => {
    const deviceType = visitor.device_type || 'Unknown';
    devices[deviceType] = (devices[deviceType] || 0) + 1;
  });
  
  return Object.keys(devices).map(key => ({ 
    name: key.charAt(0).toUpperCase() + key.slice(1), 
    value: devices[key] 
  }));
}

function processCountryData(visitors: any[]): CountryData[] {
  const countries: {[key: string]: number} = {};
  
  visitors.forEach((visitor) => {
    const country = visitor.country || 'Unknown';
    countries[country] = (countries[country] || 0) + 1;
  });
  
  return Object.keys(countries)
    .map(key => ({ name: key, value: countries[key] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Top 8 countries
}

function processSourceData(visitors: any[]): SourceData[] {
  const sources: {[key: string]: number} = {};
  
  visitors.forEach((visitor) => {
    let source = 'Direct';
    
    if (visitor.utm_source) {
      source = visitor.utm_source;
    } else if (visitor.referrer && typeof window !== 'undefined' && visitor.referrer !== window.location.origin) {
      try {
        const referrerUrl = new URL(visitor.referrer);
        source = referrerUrl.hostname;
      } catch {
        source = 'Referral';
      }
    }
    
    sources[source] = (sources[source] || 0) + 1;
  });
  
  return Object.keys(sources)
    .map(key => ({ name: key, value: sources[key] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 sources
}

function calculateUniqueCountries(visitors: any[]): number {
  const uniqueCountries = new Set();
  visitors.forEach(visitor => {
    if (visitor.country) uniqueCountries.add(visitor.country);
  });
  return uniqueCountries.size;
}

function calculateAverageTimeOnPage(visitors: any[]): number {
  const timeValues = visitors
    .filter(v => v.time_on_page && v.time_on_page > 0 && v.time_on_page < 3600) // Filter out outliers
    .map(v => v.time_on_page);
  
  if (timeValues.length === 0) return 0;
  
  const avgTime = timeValues.reduce((a, b) => a + b, 0) / timeValues.length;
  return Math.round(avgTime);
}

function findMostPopularPage(visitors: any[]): string {
  const pages: {[key: string]: number} = {};
  
  visitors.forEach((visitor) => {
    if (visitor.page_url) {
      try {
        const url = new URL(visitor.page_url);
        const pathname = url.pathname === '' ? '/' : url.pathname;
        pages[pathname] = (pages[pathname] || 0) + 1;
      } catch {
        pages['/'] = (pages['/'] || 0) + 1;
      }
    }
  });
  
  const sortedPages = Object.keys(pages)
    .sort((a, b) => pages[b] - pages[a]);
  
  return sortedPages[0] || '/';
}
