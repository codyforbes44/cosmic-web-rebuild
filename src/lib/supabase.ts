
import { supabase } from '@/integrations/supabase/client';

// Helper function to handle form submission to Supabase
export const submitToSupabase = async <T extends Record<string, any>>(
  tableName: string, 
  data: T
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // Cast to any to bypass TypeScript's type checking for table names
    const { error } = await supabase.from(tableName as any).insert([data]);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error(`Error submitting to ${tableName}:`, error);
    return { success: false, error };
  }
};

// Type definitions for our forms
export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export type QuoteFormData = {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  budget?: string;
  service_type: string;
  project_description: string;
  timeline?: string;
  terms_accepted: boolean;
  created_at: string;
};
