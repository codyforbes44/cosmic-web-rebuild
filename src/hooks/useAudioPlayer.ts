import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AudioFile } from '@/types/audio';

export const useAudioPlayer = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentAudioRecord, setCurrentAudioRecord] = useState<AudioFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const loadLocalAudio = (file: File, audioRecord: AudioFile) => {
    setAudioFile(file);
    setCurrentAudioRecord(audioRecord);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const loadHistoricalAudio = async (audioRecord: AudioFile) => {
    try {
      // Reset current state first
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      
      // Since bucket is now public, use getPublicUrl method
      const { data } = supabase.storage
        .from('audio-files')
        .getPublicUrl(audioRecord.storage_path);
      
      const publicUrl = data.publicUrl;

      // Clear any existing audio source first
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load(); // Reset the audio element
      }

      console.log('Setting audio URL:', publicUrl);
      setAudioUrl(publicUrl);
      setCurrentAudioRecord(audioRecord);
      setAudioFile(null); // Clear the file object since this is from storage
      
      // Wait a moment for the audio element to be ready
      setTimeout(() => {
        if (audioRef.current) {
          console.log('Audio element ready state:', audioRef.current.readyState);
          console.log('Audio src set to:', audioRef.current.src);
        }
      }, 100);

      return { success: true };
    } catch (error) {
      console.error('Error loading historical audio:', error);
      return { success: false, error };
    }
  };

  const togglePlayPause = () => {
    console.log('Toggle play/pause called. audioUrl:', audioUrl, 'isPlaying:', isPlaying);
    if (audioRef.current && audioUrl) {
      console.log('Audio element state:', {
        readyState: audioRef.current.readyState,
        src: audioRef.current.src,
        duration: audioRef.current.duration,
        currentTime: audioRef.current.currentTime
      });
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Ensure audio source is loaded before playing
        if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
          console.log('Audio ready, attempting to play');
          audioRef.current.play().catch(error => {
            console.error('Audio play error:', error);
            throw new Error('Unable to play audio file. Please try again.');
          });
          setIsPlaying(true);
        } else {
          console.log('Audio not ready, waiting for canplay event');
          // Wait for audio to load
          audioRef.current.addEventListener('canplay', () => {
            console.log('Audio canplay event fired, attempting to play');
            audioRef.current?.play().catch(error => {
              console.error('Audio play error:', error);
              throw new Error('Unable to play audio file. Please try again.');
            });
            setIsPlaying(true);
          }, { once: true });
        }
      }
    } else {
      console.warn('Cannot play: audioRef.current =', !!audioRef.current, 'audioUrl =', audioUrl);
    }
  };

  const resetAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = async () => {
    if (audioRef.current && currentAudioRecord) {
      const audioDuration = audioRef.current.duration;
      setDuration(audioDuration);
      
      // Only try to update duration in database if user is authenticated
      if (!currentAudioRecord.duration) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase
              .from('audio_files')
              .update({ duration: audioDuration })
              .eq('id', currentAudioRecord.id);
          }
        } catch (error) {
          console.error('Error updating audio duration:', error);
        }
      }
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const clearAudio = () => {
    // Stop and reset audio element first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
    }
    
    setAudioFile(null);
    setAudioUrl(null);
    setCurrentAudioRecord(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    console.log('Audio playback ended, isPlaying set to false');
  };

  return {
    audioFile,
    audioUrl,
    currentAudioRecord,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    loadLocalAudio,
    loadHistoricalAudio,
    togglePlayPause,
    resetAudio,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleSeek,
    clearAudio,
    formatTime,
    handleAudioEnded,
  };
};