
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
  refetch: () => Promise<void>;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [formData, setFormData] = useState<FormSubmissionData[]>([]);
  const [chatData, setChatData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const initialFetchCompleted = useRef(false);
  const isFetchingRef = useRef(false);
  
  const fetchData = async () => {
    // Prevent multiple simultaneous fetch calls
    if (isFetchingRef.current) {
      console.log('Another fetch operation is already in progress');
      return;
    }
    
    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);
      
      // Fetch visitor data from visitor_tracking table
      const { data: visitors, error: visitorError } = await supabase
        .from('visitor_tracking')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (visitorError) {
        console.error('Error fetching visitor data:', visitorError);
        throw new Error(`Error fetching visitor data: ${visitorError.message}`);
      }
      
      // Fetch form submission data from form_submissions table
      const { data: forms, error: formError } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (formError) {
        console.error('Error fetching form data:', formError);
        throw new Error(`Error fetching form data: ${formError.message}`);
      }
      
      // Fetch chat interaction data from chat_interactions table
      const { data: chats, error: chatError } = await supabase
        .from('chat_interactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (chatError) {
        console.error('Error fetching chat data:', chatError);
        throw new Error(`Error fetching chat data: ${chatError.message}`);
      }

      // Fetch contact submissions data
      const { data: contacts, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) {
        console.error('Error fetching contact data:', contactError);
        throw new Error(`Error fetching contact data: ${contactError.message}`);
      }

      // Fetch newsletter subscribers data
      const { data: subscribers, error: subscriberError } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (subscriberError) {
        console.error('Error fetching subscriber data:', subscriberError);
        throw new Error(`Error fetching subscriber data: ${subscriberError.message}`);
      }

      // Fetch quote submissions data
      const { data: quotes, error: quoteError } = await supabase
        .from('quote_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (quoteError) {
        console.error('Error fetching quote data:', quoteError);
        throw new Error(`Error fetching quote data: ${quoteError.message}`);
      }

      // Clean up data - ensure all visitor data has the expected fields and handle nulls
      const cleanVisitors = (visitors || []).map(visitor => ({
        ...visitor,
        browser: visitor.browser || 'Unknown',
        device_type: visitor.device_type || 'Desktop',
        os: visitor.os || 'Unknown',
        country_code: visitor.country_code || 'Unknown',
        city: visitor.city || 'Unknown',
        state: visitor.state || null
      }));
      
      // Set data
      setVisitorData(cleanVisitors as VisitorData[]);
      setFormData(forms as FormSubmissionData[] || []);
      setChatData(chats || []);
      
      // Use quotes, contacts and subscribers data as needed in your application
      // These are fetched but not used in the current UI
      
      const totalRecords = (cleanVisitors?.length || 0) + 
                          (forms?.length || 0) + 
                          (chats?.length || 0) +
                          (contacts?.length || 0) + 
                          (subscribers?.length || 0) + 
                          (quotes?.length || 0);
      
      if (!initialFetchCompleted.current) {
        console.log('Initial data fetch completed');
        initialFetchCompleted.current = true;
      } else {
        toast({
          title: "Analytics data loaded",
          description: `Successfully loaded ${totalRecords} total records from all Supabase tables`,
          variant: "default"
        });
      }
    } catch (err: any) {
      console.error('Error fetching analytics data:', err);
      setError(err.message || 'Failed to load analytics data');
      
      if (!initialFetchCompleted.current) {
        initialFetchCompleted.current = true;
      } else {
        toast({
          title: "Error loading analytics",
          description: err.message || "There was a problem fetching the analytics data",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };
  
  // Only fetch data once on initial component mount
  useEffect(() => {
    if (!initialFetchCompleted.current) {
      fetchData();
    }
  }, []);

  return { 
    visitorData, 
    formData, 
    chatData, 
    loading, 
    error, 
    refetch: fetchData
  };
};
