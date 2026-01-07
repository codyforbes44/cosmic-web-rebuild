-- Add honeypot columns to form tables (bots will fill these, real users won't)
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS honeypot text DEFAULT NULL;
ALTER TABLE public.quote_requests ADD COLUMN IF NOT EXISTS honeypot text DEFAULT NULL;
ALTER TABLE public.onboarding_submissions ADD COLUMN IF NOT EXISTS honeypot text DEFAULT NULL;

-- Drop old permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Anyone can submit onboarding forms" ON public.onboarding_submissions;
DROP POLICY IF EXISTS "Service role can insert metrics" ON public.edge_function_metrics;

-- Create new secure INSERT policies with honeypot validation
-- Only allow inserts where honeypot is NULL or empty string (bots typically fill honeypot fields)
CREATE POLICY "Anyone can submit contact forms with honeypot check"
ON public.contact_submissions
FOR INSERT
WITH CHECK (honeypot IS NULL OR honeypot = '');

CREATE POLICY "Anyone can submit quote requests with honeypot check"
ON public.quote_requests
FOR INSERT
WITH CHECK (honeypot IS NULL OR honeypot = '');

CREATE POLICY "Anyone can submit onboarding forms with honeypot check"
ON public.onboarding_submissions
FOR INSERT
WITH CHECK (honeypot IS NULL OR honeypot = '');

-- Restrict edge_function_metrics to service role only (no anon inserts)
-- Service role bypasses RLS, so this effectively blocks all client-side inserts
CREATE POLICY "Only service role can insert metrics"
ON public.edge_function_metrics
FOR INSERT
WITH CHECK (false);