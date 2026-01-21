-- Fix edge_function_metrics INSERT policy to allow service role inserts
DROP POLICY IF EXISTS "Service role can insert metrics" ON public.edge_function_metrics;
CREATE POLICY "Service role can insert metrics" 
ON public.edge_function_metrics 
FOR INSERT 
TO authenticated, anon
WITH CHECK (true);

-- Restrict contact_submissions to admin-only SELECT
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (
  honeypot IS NULL OR honeypot = ''
);

CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Restrict quote_requests to admin-only SELECT
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Admins can view quote requests" ON public.quote_requests;

CREATE POLICY "Anyone can submit quote requests" 
ON public.quote_requests 
FOR INSERT 
TO anon, authenticated
WITH CHECK (
  honeypot IS NULL OR honeypot = ''
);

CREATE POLICY "Admins can view quote requests" 
ON public.quote_requests 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Restrict onboarding_submissions to admin-only SELECT
DROP POLICY IF EXISTS "Anyone can submit onboarding" ON public.onboarding_submissions;
DROP POLICY IF EXISTS "Admins can view onboarding submissions" ON public.onboarding_submissions;

CREATE POLICY "Anyone can submit onboarding" 
ON public.onboarding_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (
  honeypot IS NULL OR honeypot = ''
);

CREATE POLICY "Admins can view onboarding submissions" 
ON public.onboarding_submissions 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Restrict visitor_metadata to admin-only SELECT
DROP POLICY IF EXISTS "Anyone can insert visitor metadata" ON public.visitor_metadata;
DROP POLICY IF EXISTS "Admins can view visitor metadata" ON public.visitor_metadata;

CREATE POLICY "Anyone can insert visitor metadata" 
ON public.visitor_metadata 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view visitor metadata" 
ON public.visitor_metadata 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add admin-only DELETE policies for cleanup
CREATE POLICY "Admins can delete visitor metadata" 
ON public.visitor_metadata 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete quote requests" 
ON public.quote_requests 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete onboarding submissions" 
ON public.onboarding_submissions 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);