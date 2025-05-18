
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { VisitorData, FormSubmissionData } from '@/types/tracking';

interface UseAnalyticsReturn {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
  loading: boolean;
  error: string | null;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const fetchVisitorData = async (): Promise<VisitorData[]> => {
    const { data, error } = await supabase
      .from('visitor_tracking')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
      
    if (error) throw new Error(`Failed to fetch visitor data: ${error.message}`);
    return data as VisitorData[] || [];
  };
  
  const fetchFormData = async (): Promise<FormSubmissionData[]> => {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw new Error(`Failed to fetch form submission data: ${error.message}`);
    return data as FormSubmissionData[] || [];
  };
  
  const visitorQuery = useQuery({
    queryKey: ['visitorData'],
    queryFn: fetchVisitorData,
  });
  
  const formQuery = useQuery({
    queryKey: ['formData'],
    queryFn: fetchFormData,
  });
  
  return {
    visitorData: visitorQuery.data || [],
    formData: formQuery.data || [],
    loading: visitorQuery.isLoading || formQuery.isLoading,
    error: visitorQuery.error?.message || formQuery.error?.message || null,
  };
};
