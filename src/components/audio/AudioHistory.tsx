import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AudioFile } from '@/types/audio';

interface AudioHistoryProps {
  audioHistory: AudioFile[];
  currentAudioRecord: AudioFile | null;
  onLoadAudio: (audioRecord: AudioFile) => void;
  onDeleteAudio: (audioRecord: AudioFile) => void;
  formatTime: (time: number) => string;
}

const AudioHistory = ({ 
  audioHistory, 
  currentAudioRecord, 
  onLoadAudio, 
  onDeleteAudio,
  formatTime 
}: AudioHistoryProps) => {
  const { toast } = useToast();

  const handleLoadAudio = async (audioRecord: AudioFile) => {
    try {
      await onLoadAudio(audioRecord);
      toast({
        title: "Audio Loaded",
        description: `Loaded ${audioRecord.original_name}`,
      });
    } catch (error) {
      console.error('Error loading historical audio:', error);
      toast({
        title: "Load Failed",
        description: "Failed to load audio file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAudio = async (audioRecord: AudioFile) => {
    try {
      await onDeleteAudio(audioRecord);
      toast({
        title: "File Deleted",
        description: `${audioRecord.original_name} has been deleted`,
      });
    } catch (error) {
      console.error('Error deleting audio file:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete audio file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Audio History
        </CardTitle>
        <CardDescription>
          Previously uploaded audio files and their reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        {audioHistory.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No audio files uploaded yet
          </p>
        ) : (
          <div className="space-y-3">
            {audioHistory.map((record) => (
              <div
                key={record.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  currentAudioRecord?.id === record.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                onClick={() => handleLoadAudio(record)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{record.original_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {((record.file_size || 0) / 1024 / 1024).toFixed(2)} MB
                      {record.duration && ` • ${formatTime(record.duration)}`}
                      {' • '}
                      {new Date(record.created_at).toLocaleDateString()}
                    </p>
                    {record.review_notes && (
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        Notes: {record.review_notes}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAudio(record);
                    }}
                    variant="outline"
                    size="sm"
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioHistory;