
import { supabase } from '@/integrations/supabase/client';

// Helper function to handle form submission to Supabase
export const submitToSupabase = async <T extends Record<string, any>>(
  tableName: string, 
  data: T
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // Use type assertion to bypass TypeScript's type checking for table names
    const { error } = await (supabase.from(tableName) as any).insert([data]);
    
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
  createdAt: string;
};

export type QuoteFormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  budget?: string;
  serviceType: string;
  projectDescription: string;
  timeline?: string;
  termsAccepted: boolean;
  createdAt: string;
};
