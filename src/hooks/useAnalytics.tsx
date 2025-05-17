
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { VisitorData, FormSubmissionData } from '@/types/tracking';

interface UseAnalyticsReturn {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
  chatData: any[]; // Chat interaction data
  loading: boolean;
  error: string | null;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [formData, setFormData] = useState<FormSubmissionData[]>([]);
  const [chatData, setChatData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
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
        
        // Cast data to the correct types
        setVisitorData(visitors as VisitorData[] || []);
        setFormData(forms as FormSubmissionData[] || []);
        setChatData(chats || []);
      } catch (err: any) {
        console.error('Error fetching analytics data:', err);
        setError(err.message || 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { visitorData, formData, chatData, loading, error };
};
