-- Make the audio-files bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'audio-files';

-- Create policy for public read access to audio files
CREATE POLICY "Public can view audio files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'audio-files');

-- Allow public access to download audio files
CREATE POLICY "Public can download audio files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'audio-files');