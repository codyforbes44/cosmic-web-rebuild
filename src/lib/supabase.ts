
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase credentials are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase credentials are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.'
  );
}

// Create a mock client when credentials are missing (for development only)
const createMockClient = () => {
  return {
    from: (table: string) => ({
      insert: async () => ({ error: null }),
      select: async () => ({ data: [], error: null }),
      update: async () => ({ error: null }),
      delete: async () => ({ error: null }),
    }),
    auth: {
      signUp: async () => ({ error: null }),
      signIn: async () => ({ error: null }),
      signOut: async () => ({ error: null }),
    },
  };
};

// Create and export the Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient() as any;

// Helper function to handle form submission to Supabase
export const submitToSupabase = async <T extends Record<string, any>>(
  tableName: string, 
  data: T
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // If we're using the mock client, just pretend it worked
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(`Using mock Supabase client for ${tableName}. Data will not be saved.`, data);
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
