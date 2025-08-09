import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

const AudioReview = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setCurrentTime(0);
      setIsPlaying(false);

      toast({
        title: "Audio File Loaded",
        description: `Successfully loaded ${file.name}`,
      });
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
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

  const clearAudio = () => {
    setAudioFile(null);
    setAudioUrl(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
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

      <div className="min-h-screen bg-background">
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
                {!audioFile ? (
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
                      className="bg-primary hover:bg-primary/90"
                    >
                      Choose Audio File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div>
                        <h3 className="font-semibold">{audioFile.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {(audioFile.size / 1024 / 1024).toFixed(2)} MB
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
                          className="hidden"
                        />

                        <div className="flex items-center gap-4">
                          <Button
                            onClick={togglePlayPause}
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
                  Use this space to document your audio review findings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full h-32 p-3 border border-border rounded-md bg-background text-foreground resize-none"
                  placeholder="Enter your review notes here..."
                />
                <div className="mt-4 flex gap-2">
                  <Button className="bg-primary hover:bg-primary/90">
                    Save Review
                  </Button>
                  <Button variant="outline">
                    Export Notes
                  </Button>
                </div>
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