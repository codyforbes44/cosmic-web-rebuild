-- Allow unauthenticated users to view all audio files for public access
CREATE POLICY "Anyone can view audio files for public access" 
ON public.audio_files 
FOR SELECT 
USING (true);