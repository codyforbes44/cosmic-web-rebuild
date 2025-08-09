import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
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
              console.error('Audio element error:', e);
              toast({
                title: "Audio Error",
                description: "Failed to load audio file. Please try a different file.",
                variant: "destructive",
              });
            }}
            onLoadStart={() => {
              console.log('Audio loading started');
            }}
            onCanPlay={() => {
              console.log('Audio can play');
            }}
            className="hidden"
            preload="metadata"
          />

          <div className="flex items-center gap-4">
            <Button
              onClick={handlePlayPause}
              disabled={!audioUrl}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="h-4 w-4" />
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