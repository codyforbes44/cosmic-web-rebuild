-- Fix critical RLS issues causing site to fail

-- =============================================
-- FIX 1: Remove recursive policy from user_roles
-- This policy causes infinite recursion because it uses has_role() 
-- which queries user_roles, triggering the same policy check
-- =============================================
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- =============================================
-- FIX 2: Fix visitor_metadata INSERT policy
-- Current policy is too restrictive and blocks legitimate tracking
-- =============================================
DROP POLICY IF EXISTS "Allow anonymous inserts to visitor_metadata with validation" ON public.visitor_metadata;

CREATE POLICY "Anyone can insert visitor metadata"
ON public.visitor_metadata
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- =============================================
-- FIX 3: Fix edge_function_metrics INSERT policy  
-- Current policy has WITH CHECK (false) which blocks all inserts
-- Edge functions need to record metrics
-- =============================================
DROP POLICY IF EXISTS "Only service role can insert metrics" ON public.edge_function_metrics;

CREATE POLICY "Allow metrics inserts"
ON public.edge_function_metrics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);