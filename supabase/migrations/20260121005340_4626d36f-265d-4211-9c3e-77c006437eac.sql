-- Clean up duplicate and overly permissive RLS policies

-- =============================================
-- CONTACT_SUBMISSIONS - Remove duplicate policies
-- =============================================
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can read contact submissions" ON public.contact_submissions;
-- Keep: "Anyone can submit contact forms with honeypot check" (INSERT)
-- Keep: "Admins can view contact submissions" (SELECT)
-- Keep: "Admins can delete contact submissions" (DELETE)

-- =============================================
-- QUOTE_REQUESTS - Remove duplicate policies
-- =============================================
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Admins can read quote requests" ON public.quote_requests;
-- Keep: "Anyone can submit quote requests with honeypot check" (INSERT)
-- Keep: "Admins can view quote requests" (SELECT)
-- Keep: "Admins can delete quote requests" (DELETE)

-- =============================================
-- ONBOARDING_SUBMISSIONS - Remove duplicate policies
-- =============================================
DROP POLICY IF EXISTS "Anyone can submit onboarding" ON public.onboarding_submissions;
DROP POLICY IF EXISTS "Admins can read onboarding submissions" ON public.onboarding_submissions;
-- Keep: "Anyone can submit onboarding forms with honeypot check" (INSERT)
-- Keep: "Admins can view onboarding submissions" (SELECT)
-- Keep: "Admins can delete onboarding submissions" (DELETE)

-- =============================================
-- VISITOR_METADATA - Fix overly permissive INSERT and remove duplicate
-- =============================================
DROP POLICY IF EXISTS "Anyone can insert visitor metadata" ON public.visitor_metadata;
DROP POLICY IF EXISTS "Admins can read visitor metadata" ON public.visitor_metadata;
-- Keep: "Allow anonymous inserts to visitor_metadata with validation" (INSERT with actual check)
-- Keep: "Admins can view visitor metadata" (SELECT)
-- Keep: "Admins can delete visitor metadata" (DELETE)

-- =============================================
-- EDGE_FUNCTION_METRICS - Fix overly permissive INSERT
-- =============================================
DROP POLICY IF EXISTS "Service role can insert metrics" ON public.edge_function_metrics;
-- Keep: "Only service role can insert metrics" (which has WITH CHECK (false) - service role bypasses RLS anyway)
-- Keep: "Admins can read all metrics" (SELECT)

-- =============================================
-- PROFILES - Remove duplicate SELECT policy
-- =============================================
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
-- Keep: "Users can read their own profile" (SELECT - includes admin check)
-- Keep: "Users can insert their own profile" (INSERT)
-- Keep: "Users can update their own profile" (UPDATE)

-- =============================================
-- ANALYTICS_DIGEST_HISTORY - Fix overly permissive INSERT
-- =============================================
-- The "Service role can insert digest history" has WITH CHECK (true)
-- Service role bypasses RLS anyway, so we can make this more restrictive
DROP POLICY IF EXISTS "Service role can insert digest history" ON public.analytics_digest_history;

-- Create a restrictive policy that only allows authenticated inserts from admin
CREATE POLICY "Admins can insert digest history"
ON public.analytics_digest_history
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

-- =============================================
-- FAVORITE_LOCATIONS - Remove duplicate INSERT policy
-- =============================================
DROP POLICY IF EXISTS "Users can create their own favorite locations" ON public.favorite_locations;
-- Keep: "Users can insert their own favorite locations" (INSERT)
-- Keep other policies