/**
 * Audio History Hook
 * 
 * Uses the centralized query factory for consistent data fetching.
 * Provides backwards-compatible API for existing consumers.
 */

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAudioHistoryQuery, useDeleteAudioMutation } from '@/lib/queries/hooks';
import { queryKeys } from '@/lib/queries';
import { AudioFile } from '@/types/audio';

export const useAudioHistory = (onAutoLoad?: (audioFile: AudioFile) => Promise<void>) => {
  const queryClient = useQueryClient();
  
  // Use the centralized query
  const { 
    data: audioHistory = [], 
    refetch: loadAudioHistory,
    isSuccess,
  } = useAudioHistoryQuery();
  
  // Use centralized mutation
  const deleteMutation = useDeleteAudioMutation();

  // Auto-load most recent file when data first loads
  useEffect(() => {
    if (isSuccess && audioHistory.length > 0 && onAutoLoad) {
      console.log('Auto-loading most recent audio file:', audioHistory[0].original_name);
      onAutoLoad(audioHistory[0] as AudioFile);
    }
  }, [isSuccess, audioHistory.length > 0]);

  // Backwards-compatible delete function
  const deleteAudioFile = async (audioRecord: AudioFile) => {
    try {
      await deleteMutation.mutateAsync({
        id: audioRecord.id,
        storagePath: audioRecord.storage_path,
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting audio file:', error);
      return { success: false, error };
    }
  };

  return {
    audioHistory: audioHistory as AudioFile[],
    loadAudioHistory,
    deleteAudioFile,
    // Expose additional states for advanced usage
    isDeleting: deleteMutation.isPending,
  };
};