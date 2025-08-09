import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2 } from 'lucide-react';
import StarBackground from '@/components/audio/StarBackground';
import AudioUploader from '@/components/audio/AudioUploader';
import AudioPlayer from '@/components/audio/AudioPlayer';
import ReviewNotes from '@/components/audio/ReviewNotes';
import AudioHistory from '@/components/audio/AudioHistory';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAudioHistory } from '@/hooks/useAudioHistory';

const AudioReview = () => {
  const {
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
  } = useAudioPlayer();

  const { audioHistory, loadAudioHistory, deleteAudioFile } = useAudioHistory();

  const handleUploadSuccess = (file: File, audioRecord: any) => {
    loadLocalAudio(file, audioRecord);
  };

  const handleNotesUpdate = (notes: string) => {
    // Refresh history to update the notes display
    loadAudioHistory();
  };

  const handleLoadHistoricalAudio = async (audioRecord: any) => {
    const result = await loadHistoricalAudio(audioRecord);
    if (!result.success) {
      throw new Error('Failed to load audio file');
    }
  };

  const handleDeleteAudio = async (audioRecord: any) => {
    const result = await deleteAudioFile(audioRecord);
    if (!result.success) {
      throw new Error('Failed to delete audio file');
    }
    
    // Clear current audio if it's the one being deleted
    if (currentAudioRecord?.id === audioRecord.id) {
      clearAudio();
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
        <StarBackground />
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-20 pb-16 relative z-10">
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
                  <AudioUploader 
                    onUploadSuccess={handleUploadSuccess}
                    onHistoryRefresh={loadAudioHistory}
                  />
                ) : (
                  <AudioPlayer
                    audioFile={audioFile}
                    audioUrl={audioUrl}
                    currentAudioRecord={currentAudioRecord}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    audioRef={audioRef}
                    onTogglePlayPause={togglePlayPause}
                    onReset={resetAudio}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onSeek={handleSeek}
                    onClear={clearAudio}
                    onAudioEnded={handleAudioEnded}
                    formatTime={formatTime}
                  />
                )}
              </CardContent>
            </Card>

            <ReviewNotes
              currentAudioRecord={currentAudioRecord}
              onNotesUpdate={handleNotesUpdate}
            />

            <AudioHistory
              audioHistory={audioHistory}
              currentAudioRecord={currentAudioRecord}
              onLoadAudio={handleLoadHistoricalAudio}
              onDeleteAudio={handleDeleteAudio}
              formatTime={formatTime}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AudioReview;