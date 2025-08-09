import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AudioFile } from '@/types/audio';

interface ReviewNotesProps {
  currentAudioRecord: AudioFile | null;
  onNotesUpdate: (notes: string) => void;
}

const ReviewNotes = ({ currentAudioRecord, onNotesUpdate }: ReviewNotesProps) => {
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setReviewNotes(currentAudioRecord?.review_notes || '');
  }, [currentAudioRecord]);

  const saveReviewNotes = async () => {
    if (!currentAudioRecord) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('audio_files')
        .update({ review_notes: reviewNotes })
        .eq('id', currentAudioRecord.id);

      if (error) throw error;

      onNotesUpdate(reviewNotes);

      toast({
        title: "Review Saved",
        description: "Your review notes have been saved successfully",
      });
    } catch (error) {
      console.error('Error saving review notes:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save review notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Notes</CardTitle>
        <CardDescription>
          Document your findings and observations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <textarea
          value={reviewNotes}
          onChange={(e) => setReviewNotes(e.target.value)}
          className="w-full h-32 p-3 border border-border rounded-md bg-background text-foreground resize-none whitespace-pre-wrap break-words"
          placeholder="Enter your review notes here..."
        />
        <div className="mt-4 flex gap-2">
          <Button 
            onClick={saveReviewNotes}
            disabled={!currentAudioRecord || isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Review'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewNotes;