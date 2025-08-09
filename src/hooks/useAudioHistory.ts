import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AudioFile } from '@/types/audio';

export const useAudioHistory = () => {
  const [audioHistory, setAudioHistory] = useState<AudioFile[]>([]);

  const loadAudioHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('audio_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAudioHistory(data || []);
    } catch (error) {
      console.error('Error loading audio history:', error);
    }
  };

  const deleteAudioFile = async (audioRecord: AudioFile) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('audio-files')
        .remove([audioRecord.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('audio_files')
        .delete()
        .eq('id', audioRecord.id);

      if (dbError) throw dbError;

      // Refresh history
      await loadAudioHistory();

      return { success: true };
    } catch (error) {
      console.error('Error deleting audio file:', error);
      return { success: false, error };
    }
  };

  useEffect(() => {
    loadAudioHistory();
  }, []);

  return {
    audioHistory,
    loadAudioHistory,
    deleteAudioFile,
  };
};