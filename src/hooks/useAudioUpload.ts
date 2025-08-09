import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AudioFile } from '@/types/audio';
import { nanoid } from 'nanoid';

export const useAudioUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadAudio = async (file: File) => {
    if (!file.type.startsWith('audio/')) {
      throw new Error('Please select an audio file (MP3, WAV, OGG, etc.)');
    }

    setIsUploading(true);
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please sign in to upload audio files');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${nanoid()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('audio-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { data: audioRecord, error: dbError } = await supabase
        .from('audio_files')
        .insert({
          user_id: user.id,
          filename: fileName,
          original_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          storage_path: filePath,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      return audioRecord as AudioFile;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadAudio,
    isUploading,
  };
};