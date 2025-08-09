import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAudioUpload } from '@/hooks/useAudioUpload';
import { AudioFile } from '@/types/audio';

interface AudioUploaderProps {
  onUploadSuccess: (file: File, audioRecord: AudioFile) => void;
  onHistoryRefresh: () => void;
}

const AudioUploader = ({ onUploadSuccess, onHistoryRefresh }: AudioUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { uploadAudio, isUploading } = useAudioUpload();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const audioRecord = await uploadAudio(file);
        onUploadSuccess(file, audioRecord);
        onHistoryRefresh();

        toast({
          title: "Audio File Uploaded",
          description: `Successfully uploaded and saved ${file.name}`,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to upload audio file. Please try again.';
        toast({
          title: errorMessage.includes('sign in') ? "Authentication Required" : "Upload Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Upload Audio File</h3>
      <p className="text-muted-foreground mb-4">
        Support for MP3, WAV, OGG, and other audio formats
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
        id="audio-upload"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="bg-primary hover:bg-primary/90"
      >
        {isUploading ? 'Uploading...' : 'Choose Audio File'}
      </Button>
    </div>
  );
};

export default AudioUploader;