import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Play, Pause, RotateCcw, Volume2, Save, FileText, Trash2, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { nanoid } from 'nanoid';

interface AudioFile {
  id: string;
  original_name: string;
  file_size: number;
  duration?: number;
  mime_type: string;
  storage_path: string;
  review_notes?: string;
  created_at: string;
}

const AudioReview = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentAudioRecord, setCurrentAudioRecord] = useState<AudioFile | null>(null);
  const [audioHistory, setAudioHistory] = useState<AudioFile[]>([]);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Load audio history on component mount
  useEffect(() => {
    loadAudioHistory();
  }, []);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if it's an audio file
      if (!file.type.startsWith('audio/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an audio file (MP3, WAV, OGG, etc.)",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to upload audio files",
            variant: "destructive",
          });
          return;
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

        // Set current file for playback
        setAudioFile(file);
        setCurrentAudioRecord(audioRecord);
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        setCurrentTime(0);
        setIsPlaying(false);
        setReviewNotes('');

        // Refresh history
        loadAudioHistory();

        toast({
          title: "Audio File Uploaded",
          description: `Successfully uploaded and saved ${file.name}`,
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Failed",
          description: "Failed to upload audio file. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure audio source is loaded before playing
        if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
          audioRef.current.play().catch(error => {
            console.error('Audio play error:', error);
            toast({
              title: "Playback Error",
              description: "Unable to play audio file. Please try again.",
              variant: "destructive",
            });
          });
        } else {
          // Wait for audio to load
          audioRef.current.addEventListener('canplay', () => {
            audioRef.current?.play().catch(error => {
              console.error('Audio play error:', error);
              toast({
                title: "Playback Error", 
                description: "Unable to play audio file. Please try again.",
                variant: "destructive",
              });
            });
          }, { once: true });
        }
      }
      setIsPlaying(!isPlaying);
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
      
      // Update duration in database if not already set
      if (!currentAudioRecord.duration) {
        try {
          await supabase
            .from('audio_files')
            .update({ duration: audioDuration })
            .eq('id', currentAudioRecord.id);
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const saveReviewNotes = async () => {
    if (!currentAudioRecord) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('audio_files')
        .update({ review_notes: reviewNotes })
        .eq('id', currentAudioRecord.id);

      if (error) throw error;

      // Update local state
      setCurrentAudioRecord(prev => prev ? { ...prev, review_notes: reviewNotes } : null);
      loadAudioHistory();

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

      setAudioUrl(publicUrl);
      setCurrentAudioRecord(audioRecord);
      setReviewNotes(audioRecord.review_notes || '');
      setAudioFile(null); // Clear the file object since this is from storage

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

      // Clear current audio if it's the one being deleted
      if (currentAudioRecord?.id === audioRecord.id) {
        clearAudio();
      }

      // Refresh history
      loadAudioHistory();

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
    setReviewNotes('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Helmet>
        <title>Audio Review - ƷBI</title>
        <meta name="description" content="Upload and review audio files with our professional audio review tool." />
        <meta property="og:title" content="Audio Review - ƷBI" />
        <meta property="og:description" content="Upload and review audio files with our professional audio review tool." />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Star Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Audio Review
              </h1>
              <p className="text-xl text-muted-foreground">
                Upload and listen to audio files for professional review
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Audio Upload & Player
                </CardTitle>
                <CardDescription>
                  Upload an audio file to begin your review session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!audioFile && !currentAudioRecord ? (
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
                ) : (
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
                        onClick={clearAudio}
                      >
                        Remove
                      </Button>
                    </div>

                        {audioUrl && (
                          <div className="space-y-4">
                            <audio
                              ref={audioRef}
                              src={audioUrl}
                              onTimeUpdate={handleTimeUpdate}
                              onLoadedMetadata={handleLoadedMetadata}
                              onEnded={() => setIsPlaying(false)}
                              onError={(e) => {
                                console.error('Audio element error:', e);
                                toast({
                                  title: "Audio Error",
                                  description: "Failed to load audio file. Please try a different file.",
                                  variant: "destructive",
                                });
                                setIsPlaying(false);
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
                                onClick={togglePlayPause}
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
                            onClick={resetAudio}
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
                              onChange={handleSeek}
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
                )}
              </CardContent>
            </Card>

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
                  className="w-full h-32 p-3 border border-border rounded-md bg-background text-foreground resize-none"
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

            {/* Audio History */}
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
                        onClick={() => loadHistoricalAudio(record)}
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
                              deleteAudioFile(record);
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
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AudioReview;