import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AudioFile } from '@/types/audio';

interface AudioPlayerProps {
  audioFile: File | null;
  audioUrl: string | null;
  currentAudioRecord: AudioFile | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  onTogglePlayPause: () => void;
  onReset: () => void;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onAudioEnded: () => void;
  formatTime: (time: number) => string;
}

const AudioPlayer = ({
  audioFile,
  audioUrl,
  currentAudioRecord,
  isPlaying,
  currentTime,
  duration,
  audioRef,
  onTogglePlayPause,
  onReset,
  onTimeUpdate,
  onLoadedMetadata,
  onSeek,
  onClear,
  onAudioEnded,
  formatTime,
}: AudioPlayerProps) => {
  const { toast } = useToast();

  const handlePlayPause = () => {
    try {
      onTogglePlayPause();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to play audio file. Please try again.';
      toast({
        title: "Playback Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handlePlaySpecificAudio = async () => {
    try {
      if (audioRef.current) {
        // Clear any existing source first
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        
        // Set the specific audio URL
        const specificAudioUrl = 'https://strixttogzthapdhuczm.supabase.co/storage/v1/object/public/audio-files/fd1c3b77-cca4-426a-b91a-68a1d197a2ef/fWJ02UgfAAlNlgeyoa9JJ.mp3';
        audioRef.current.src = specificAudioUrl;
        audioRef.current.load();
        
        // Wait for the audio to be ready before playing
        await new Promise((resolve, reject) => {
          const handleCanPlay = () => {
            audioRef.current?.removeEventListener('canplay', handleCanPlay);
            audioRef.current?.removeEventListener('error', handleError);
            resolve(void 0);
          };
          
          const handleError = () => {
            audioRef.current?.removeEventListener('canplay', handleCanPlay);
            audioRef.current?.removeEventListener('error', handleError);
            reject(new Error('Failed to load audio'));
          };
          
          audioRef.current?.addEventListener('canplay', handleCanPlay);
          audioRef.current?.addEventListener('error', handleError);
        });
        
        await audioRef.current.play();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to play audio file. Please try again.';
      toast({
        title: "Playback Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (!audioFile && !currentAudioRecord) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
        <div>
          <h3 className="font-semibold">
            {audioFile?.name || currentAudioRecord?.original_name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {audioFile 
              ? `${(audioFile.size / 1024 / 1024).toFixed(2)} MB` 
              : `${((currentAudioRecord?.file_size || 0) / 1024 / 1024).toFixed(2)} MB`
            }
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
        >
          Remove
        </Button>
      </div>

      {audioUrl && (
        <div className="space-y-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={onAudioEnded}
            onError={(e) => {
              const target = e.currentTarget;
              const errorCode = target.error?.code;
              const errorMessage = target.error?.message;
              
              console.error('Audio element error details:', {
                errorCode,
                errorMessage,
                src: target.src,
                readyState: target.readyState,
                networkState: target.networkState
              });
              
              let userMessage = "Failed to load audio file.";
              switch (errorCode) {
                case 1: // MEDIA_ERR_ABORTED
                  userMessage = "Audio loading was aborted.";
                  break;
                case 2: // MEDIA_ERR_NETWORK
                  userMessage = "Network error occurred while loading audio.";
                  break;
                case 3: // MEDIA_ERR_DECODE
                  userMessage = "Audio file is corrupted or unsupported format.";
                  break;
                case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
                  userMessage = "Audio format not supported by your browser.";
                  break;
                default:
                  userMessage = "Unable to load audio file.";
              }
              
              toast({
                title: "Audio Error",
                description: userMessage,
                variant: "destructive",
              });
            }}
            onLoadStart={() => {
              console.log('Audio loading started for:', audioUrl);
            }}
            onCanPlay={() => {
              console.log('Audio can play:', audioUrl);
            }}
            onLoadedData={() => {
              console.log('Audio data loaded successfully');
            }}
            onStalled={() => {
              console.warn('Audio loading stalled');
            }}
            onSuspend={() => {
              console.log('Audio loading suspended');
            }}
            className="hidden"
            preload="metadata"
          />

          <div className="flex items-center gap-4">
            <Button
              onClick={handlePlaySpecificAudio}
              variant="outline"
              size="sm"
            >
              <Play className="h-4 w-4" />
            </Button>

            <div className="flex-1 space-y-2">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={onSeek}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;