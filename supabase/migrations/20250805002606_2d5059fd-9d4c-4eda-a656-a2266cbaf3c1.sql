-- Fix critical RLS policy redundancy on contact_submissions
-- Remove redundant and potentially conflicting policies
DROP POLICY IF EXISTS "Allow inserts for everyone" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin users can read contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.contact_submissions;

-- Keep only the essential, secure policies
-- Policy for public to submit contact forms (INSERT only)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Policy for admins to read contact submissions (SELECT only)
CREATE POLICY "Admins can read contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (is_admin());

-- Fix similar redundancy on quote_requests table
DROP POLICY IF EXISTS "Allow inserts for everyone" ON public.quote_requests;
DROP POLICY IF EXISTS "Admin users can read quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow anonymous quote form submissions" ON public.quote_requests;

-- Keep only the essential, secure policies for quote_requests
CREATE POLICY "Anyone can submit quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Policy for admins to read quote requests (SELECT only)
CREATE POLICY "Admins can read quote requests" 
ON public.quote_requests 
FOR SELECT 
USING (is_admin());

-- Fix database function security by adding proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = 'public';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$;