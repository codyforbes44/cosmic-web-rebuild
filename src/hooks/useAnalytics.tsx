
import { useState, useEffect } from 'react';
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
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [formData, setFormData] = useState<FormSubmissionData[]>([]);
  const [chatData, setChatData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch visitor data
      const { data: visitors, error: visitorError } = await supabase
        .from('visitor_tracking')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
      
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
    fetchData();
  }, []);

  return { visitorData, formData, chatData, loading, error, refetch: fetchData };
};
