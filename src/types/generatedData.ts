
// Define types for generated data
export interface GeneratedVisitorData {
  session_id: string;
  user_agent: string;
  language: string;
  screen_width: number;
  screen_height: number;
  timezone: string;
  referrer: string | null;
  path: string;
  ip_address: string;
  country_code: string;
  city: string;
  state: string | null;
  browser: string;
  os: string;
  device_type: string;
  created_at: string;
}

export interface GeneratedFormData {
  session_id: string;
  form_name: string;
  form_data: any;
  path: string;
  created_at: string;
}

export interface GeneratedChatData {
  session_id: string;
  user_name: string | null;
  user_email: string | null;
  message: string;
  response: string;
  created_at: string;
}

export interface DataPopulatorProps {
  className?: string;
}
