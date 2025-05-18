
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

export const useAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true);
        
        // Fetch all visitor data
        const { data: visitorData, error: fetchError } = await supabase
          .from('visitor_metadata')
          .select('*')
          .order('visit_timestamp', { ascending: false });
        
        if (fetchError) throw fetchError;
        
        // Process daily visitors (last 7 days)
        const now = new Date();
        const dailyData: VisitorCount[] = [];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          const count = (visitorData || []).filter(v => {
            const visitDate = v.visit_timestamp ? new Date(v.visit_timestamp).toISOString().split('T')[0] : null;
            return visitDate === dateStr;
          }).length;
          
          dailyData.push({ date: dateStr, count });
        }
        
        // Process device data
        const devices: {[key: string]: number} = {};
        (visitorData || []).forEach((visitor) => {
          if (visitor.device_type) {
            devices[visitor.device_type] = (devices[visitor.device_type] || 0) + 1;
          }
        });
        
        const deviceArray = Object.keys(devices).map(key => ({ 
          name: key.charAt(0).toUpperCase() + key.slice(1), 
          value: devices[key] 
        }));
        
        // Process country data
        const countries: {[key: string]: number} = {};
        (visitorData || []).forEach((visitor) => {
          if (visitor.country) {
            countries[visitor.country] = (countries[visitor.country] || 0) + 1;
          } else {
            countries['Unknown'] = (countries['Unknown'] || 0) + 1;
          }
        });
        
        const countryArray = Object.keys(countries)
          .map(key => ({ name: key, value: countries[key] }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8); // Top 8 countries
        
        // Process source data (UTM)
        const sources: {[key: string]: number} = {};
        (visitorData || []).forEach((visitor) => {
          let source = visitor.utm_source || (visitor.referrer ? 'Referral' : 'Direct');
          sources[source] = (sources[source] || 0) + 1;
        });
        
        const sourceArray = Object.keys(sources)
          .map(key => ({ name: key, value: sources[key] }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5); // Top 5 sources
        
        // Calculate aggregated metrics
        const totalVisitors = visitorData?.length || 0;
        
        const uniqueCountries = new Set();
        (visitorData || []).forEach(visitor => {
          if (visitor.country) uniqueCountries.add(visitor.country);
        });
        const totalCountries = uniqueCountries.size;
        
        // Calculate average time on page
        const timeValues = (visitorData || [])
          .filter(v => v.time_on_page && v.time_on_page > 0 && v.time_on_page < 3600) // Filter out outliers
          .map(v => v.time_on_page);
        
        const avgTime = timeValues.length > 0 
          ? timeValues.reduce((a, b) => a + b, 0) / timeValues.length 
          : 0;
        const avgTimeOnPage = Math.round(avgTime);
        
        // Find most popular page
        const pages: {[key: string]: number} = {};
        (visitorData || []).forEach((visitor) => {
          if (visitor.page_url) {
            const url = new URL(visitor.page_url);
            pages[url.pathname] = (pages[url.pathname] || 0) + 1;
          }
        });
        
        const sortedPages = Object.keys(pages)
          .sort((a, b) => pages[b] - pages[a]);
        
        const topPage = sortedPages[0] || '/';

        // Set the full analytics data
        setData({
          visitorData: visitorData || [],
          dailyVisitors: dailyData,
          deviceData: deviceArray,
          countryData: countryArray,
          sourceData: sourceArray,
          totalVisitors,
          totalCountries,
          avgTimeOnPage,
          topPage
        });
        
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data');
        toast({
          title: 'Error',
          description: 'Failed to load analytics data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnalyticsData();
  }, []);

  return { data, loading, error };
};
