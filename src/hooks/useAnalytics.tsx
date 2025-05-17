
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { VisitorData, FormSubmissionData } from '@/types/tracking';
import { useToast } from '@/components/ui/use-toast';

interface UseAnalyticsReturn {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
  chatData: any[]; // Chat interaction data
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>; // Add refetch function
  realDataPercentage: number; // Percentage of records with real geographical data
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [formData, setFormData] = useState<FormSubmissionData[]>([]);
  const [chatData, setChatData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realDataPercentage, setRealDataPercentage] = useState<number>(0);
  const { toast } = useToast();
  const initialFetchCompleted = useRef(false);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch visitor data
      const { data: visitors, error: visitorError } = await supabase
        .from('visitor_tracking')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (visitorError) throw visitorError;
      
      // Fetch form submission data
      const { data: forms, error: formError } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (formError) throw formError;
      
      // Fetch chat interaction data
      const { data: chats, error: chatError } = await supabase
        .from('chat_interactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (chatError) throw chatError;

      // Clean up data - ensure all data has the expected fields and handle nulls
      const cleanVisitors = (visitors || []).map(visitor => ({
        ...visitor,
        browser: visitor.browser || 'Unknown',
        device_type: visitor.device_type || 'Desktop',
        os: visitor.os || 'Unknown',
        country_code: visitor.country_code || 'Unknown',
        city: visitor.city || 'Unknown',
        state: visitor.state || null
      }));
      
      // Calculate percentage of records with real geographical data (non-default values)
      if (cleanVisitors.length > 0) {
        const recordsWithRealData = cleanVisitors.filter(
          visitor => visitor.country_code !== 'Unknown' && visitor.country_code !== null
        ).length;
        
        setRealDataPercentage(Math.round((recordsWithRealData / cleanVisitors.length) * 100));
      }
      
      // Cast data to the correct types
      setVisitorData(cleanVisitors as VisitorData[]);
      setFormData(forms as FormSubmissionData[] || []);
      setChatData(chats || []);
      
      toast({
        title: "Analytics data loaded",
        description: `Loaded ${cleanVisitors.length} visitor records, ${forms?.length || 0} form submissions, and ${chats?.length || 0} chat interactions`,
        variant: "default"
      });
    } catch (err: any) {
      console.error('Error fetching analytics data:', err);
      setError(err.message || 'Failed to load analytics data');
      toast({
        title: "Error loading analytics",
        description: err.message || "There was a problem fetching the analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!initialFetchCompleted.current) {
      initialFetchCompleted.current = true;
      fetchData();
    }
  }, []);

  return { 
    visitorData, 
    formData, 
    chatData, 
    loading, 
    error, 
    refetch: fetchData,
    realDataPercentage 
  };
};
