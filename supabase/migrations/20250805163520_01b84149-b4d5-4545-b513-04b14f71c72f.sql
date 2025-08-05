-- Fix database function security by adding proper search_path
-- This prevents potential security vulnerabilities in function execution

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

-- Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- Update is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$function$;

-- Clean up redundant RLS policies on contact_submissions
-- Keep only essential policies
DROP POLICY IF EXISTS "Allow inserts for everyone" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin users can read contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.contact_submissions;

-- Keep these essential policies
-- "Admins can read contact submissions" 
-- "Anyone can submit contact forms"

-- Clean up redundant RLS policies on quote_requests
-- Keep only essential policies
DROP POLICY IF EXISTS "Allow inserts for everyone" ON public.quote_requests;
DROP POLICY IF EXISTS "Admin users can read quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow anonymous quote form submissions" ON public.quote_requests;

-- Keep these essential policies
-- "Admins can read quote requests"
-- "Anyone can submit quote requests"