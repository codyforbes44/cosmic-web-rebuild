
// Define types for visitor tracking
export interface VisitorData {
  id?: string;
  session_id: string;
  user_agent: string;
  language: string;
  screen_width: number;
  screen_height: number;
  timezone: string;
  referrer: string;
  path: string;
  ip_address?: string;
  country_code?: string;
  city?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  created_at: string;
}

// Define types for form submission tracking
export interface FormSubmissionData {
  id?: string;
  session_id: string;
  form_name: string;
  form_data: any; // Changed from Record<string, any> to any to match Json type
  path: string;
  created_at: string;
}
