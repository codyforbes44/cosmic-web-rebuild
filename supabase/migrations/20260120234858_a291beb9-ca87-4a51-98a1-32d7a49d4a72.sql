-- Phase 1: Security Hardening - Remaining Fixes

-- =============================================================================
-- 5. ENHANCE: Update contact_submissions policy (drop existing first)
-- =============================================================================

DROP POLICY IF EXISTS "Anyone can submit contact forms with honeypot check" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact forms with honeypot check"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK ((honeypot IS NULL) OR (honeypot = ''));

-- =============================================================================
-- 6. ENHANCE: Update quote_requests policy (drop existing first)
-- =============================================================================

DROP POLICY IF EXISTS "Anyone can submit quote requests with honeypot check" ON public.quote_requests;

CREATE POLICY "Anyone can submit quote requests with honeypot check"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK ((honeypot IS NULL) OR (honeypot = ''));