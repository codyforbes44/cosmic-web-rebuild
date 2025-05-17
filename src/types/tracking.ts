
// Define types for visitor tracking
export interface VisitorData {
  id?: string;
  sessionId: string;
  userAgent: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  timezone: string;
  referrer: string;
  path: string;
  ipAddress?: string;
  countryCode?: string;
  city?: string;
  browser?: string;
  os?: string;
  deviceType?: string;
  createdAt: string;
}

// Define types for form submission tracking
export interface FormSubmissionData {
  id?: string;
  sessionId: string;
  formName: string;
  formData: Record<string, any>;
  path: string;
  createdAt: string;
}
