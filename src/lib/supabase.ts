
import { createClient } from '@supabase/supabase-js';

// Default values for local development (these are safe to expose, since they won't work without proper credentials)
const defaultUrl = 'https://placeholder-project.supabase.co';
const defaultAnonKey = 'placeholder-key';

// Get environment variables or use default placeholders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultAnonKey;

// Check if running with real credentials or placeholders
const isUsingPlaceholders = supabaseUrl === defaultUrl || supabaseAnonKey === defaultAnonKey;

if (isUsingPlaceholders) {
  console.warn('Using placeholder Supabase credentials. For full functionality, please connect your project to Supabase.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add flag to check if we're using real credentials
export const isSupabaseConfigured = !isUsingPlaceholders;

// Helper function to handle form submission to Supabase
export const submitToSupabase = async <T extends Record<string, any>>(
  tableName: string, 
  data: T
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    if (!isSupabaseConfigured) {
      console.log(`Demo mode - would submit to ${tableName}:`, data);
      return { success: true, error: null };
    }

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
