
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle form submission to Supabase
export const submitToSupabase = async <T extends Record<string, any>>(
  tableName: string, 
  data: T
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase.from(tableName).insert([data]);
    
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
