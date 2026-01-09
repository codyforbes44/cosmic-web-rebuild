import React from 'react';
import SEO from '@/components/SEO';
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
import { generateSoftwareApplicationSchema } from '@/utils/seoUtils';

// WebApplication schema for generative AI optimization
const webAppSchema = generateSoftwareApplicationSchema({
  name: "ƷBI Audio Review Tool",
  description: "Professional audio review and playback tool for reviewing audio files, adding notes, and managing audio history. Perfect for podcast editing, voice-over review, and audio quality assurance.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  featureList: [
    "Audio file upload and playback",
    "Review notes with timestamps",
    "Audio history management",
    "Multiple audio format support",
    "Professional audio player controls",
    "Cloud-based audio storage"
  ]
});

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

  const handleLoadHistoricalAudio = async (audioRecord: any) => {
    const result = await loadHistoricalAudio(audioRecord);
    if (!result.success) {
      throw new Error('Failed to load audio file');
    }
  };

  const { audioHistory, loadAudioHistory, deleteAudioFile } = useAudioHistory(handleLoadHistoricalAudio);

  const handleUploadSuccess = (file: File, audioRecord: any) => {
    loadLocalAudio(file, audioRecord);
  };

  const handleNotesUpdate = (notes: string) => {
    // Refresh history to update the notes display
    loadAudioHistory();
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
      <SEO
        title="Audio Review Tool - Professional Audio Playback & Notes"
        description="Upload and review audio files with our professional audio review tool. Add timestamped notes, manage audio history, and streamline your audio review workflow."
        keywords="audio review, audio player, podcast editing, voice-over review, audio notes, audio quality assurance, audio management"
        image="/og-images/audio-review.png"
        structuredData={webAppSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://3bi.io/' },
          { name: 'Tools', url: 'https://3bi.io/' },
          { name: 'Audio Review', url: 'https://3bi.io/audio-review' }
        ]}
      />

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
