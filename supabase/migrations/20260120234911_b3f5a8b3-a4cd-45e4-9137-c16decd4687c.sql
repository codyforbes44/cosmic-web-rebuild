-- Fix: RLS Policy Always True warning for visitor_metadata
-- The anonymous INSERT with (true) is overly permissive

DROP POLICY IF EXISTS "Allow anonymous inserts to visitor_metadata" ON public.visitor_metadata;

-- Create a more restrictive policy that still allows visitor tracking
-- but adds basic validation to prevent abuse
CREATE POLICY "Allow anonymous inserts to visitor_metadata with validation"
ON public.visitor_metadata
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Ensure page_url is provided and not empty
  (page_url IS NOT NULL AND page_url != '') OR
  -- Or allow if referrer is provided (indicates real traffic)
  (referrer IS NOT NULL AND referrer != '')
);