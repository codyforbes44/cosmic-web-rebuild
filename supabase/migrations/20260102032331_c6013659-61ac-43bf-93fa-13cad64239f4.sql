-- Fix security issue: Remove public access to audio_files
-- Users should only access their own audio files
DROP POLICY IF EXISTS "Anyone can view audio files for public access" ON public.audio_files;

-- Fix security issue: Clean up redundant visitor_metadata policies
-- Remove public read access, keep only admin access
DROP POLICY IF EXISTS "Allow authenticated users to view visitor_metadata" ON public.visitor_metadata;
DROP POLICY IF EXISTS "Allow public read access to visitor metadata" ON public.visitor_metadata;

-- Clean up duplicate INSERT policies on visitor_metadata (keep only one)
DROP POLICY IF EXISTS "Allow public insert access to visitor metadata" ON public.visitor_metadata;
DROP POLICY IF EXISTS "Allow anonymous visitor tracking inserts" ON public.visitor_metadata;
DROP POLICY IF EXISTS "Allow anonymous visitor tracking" ON public.visitor_metadata;

-- Rename remaining policy for clarity
DROP POLICY IF EXISTS "Admin users can read visitor metadata" ON public.visitor_metadata;