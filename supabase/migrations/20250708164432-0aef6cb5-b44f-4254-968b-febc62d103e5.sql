
-- Create a table for onboarding submissions
CREATE TABLE public.onboarding_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company_size TEXT NOT NULL,
  website TEXT,
  primary_goals TEXT[] NOT NULL,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('email', 'phone', 'both')),
  communication_frequency TEXT NOT NULL CHECK (communication_frequency IN ('daily', 'weekly', 'biweekly', 'monthly')),
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to protect submissions
ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to submit onboarding forms (for new clients)
CREATE POLICY "Anyone can submit onboarding forms" 
  ON public.onboarding_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows admins to read all onboarding submissions
CREATE POLICY "Admins can read onboarding submissions" 
  ON public.onboarding_submissions 
  FOR SELECT 
  USING (is_admin());

-- Create trigger to update the updated_at column
CREATE TRIGGER update_onboarding_submissions_updated_at
  BEFORE UPDATE ON public.onboarding_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
