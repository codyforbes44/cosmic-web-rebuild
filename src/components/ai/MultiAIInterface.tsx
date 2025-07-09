import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Volume2, MessageSquare, Bot, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AIService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
}

const aiServices: AIService[] = [
  {
    id: 'janitor-ai',
    name: 'Janitor.ai',
    description: 'Advanced character AI chat',
    icon: <Bot className="w-4 h-4" />,
    available: true,
  },
  {
    id: 'fifteen-ai',
    name: '15.ai',
    description: 'Voice cloning and synthesis',
    icon: <Volume2 className="w-4 h-4" />,
    available: true,
  },
  {
    id: 'edge-tts',
    name: 'Edge TTS',
    description: 'Microsoft Text-to-Speech',
    icon: <Volume2 className="w-4 h-4" />,
    available: true,
  },
  {
    id: 'vosk-speech',
    name: 'Vosk',
    description: 'Speech recognition',
    icon: <Mic className="w-4 h-4" />,
    available: true,
  },
  {
    id: 'fiction-lab',
    name: 'FictionLab',
    description: 'AI story generation',
    icon: <Sparkles className="w-4 h-4" />,
    available: true,
  },
];

export const MultiAIInterface: React.FC = () => {
  const { toast } = useToast();
  const [activeService, setActiveService] = useState('janitor-ai');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Record<string, any>>({});

  // Janitor.ai state
  const [janitorMessage, setJanitorMessage] = useState('');
  const [janitorCharacter, setJanitorCharacter] = useState('');

  // 15.ai state
  const [fifteenText, setFifteenText] = useState('');
  const [fifteenVoice, setFifteenVoice] = useState('twilight_sparkle');
  const [fifteenEmotion, setFifteenEmotion] = useState('neutral');

  // Edge TTS state
  const [edgeText, setEdgeText] = useState('');
  const [edgeVoice, setEdgeVoice] = useState('en-US-AriaNeural');

  // FictionLab state
  const [fictionPrompt, setFictionPrompt] = useState('');
  const [fictionGenre, setFictionGenre] = useState('general');
  const [fictionLength, setFictionLength] = useState('medium');

  const handleJanitorAI = async () => {
    if (!janitorMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send to Janitor.ai",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('janitor-ai', {
        body: {
          message: janitorMessage,
          characterId: janitorCharacter || null,
        },
      });

      if (error) throw error;

      setResults(prev => ({
        ...prev,
        'janitor-ai': data,
      }));

      toast({
        title: "Janitor.ai Response",
        description: "Message processed successfully",
      });
    } catch (error) {
      console.error('Janitor.ai error:', error);
      toast({
        title: "Janitor.ai Error",
        description: "Failed to process message",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFifteenAI = async () => {
    if (!fifteenText.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text to synthesize with 15.ai",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fifteen-ai', {
        body: {
          text: fifteenText,
          voice: fifteenVoice,
          emotion: fifteenEmotion,
        },
      });

      if (error) throw error;

      setResults(prev => ({
        ...prev,
        'fifteen-ai': data,
      }));

      // Play audio if available
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.play();
      }

      toast({
        title: "15.ai Synthesis",
        description: "Voice generated successfully",
      });
    } catch (error) {
      console.error('15.ai error:', error);
      toast({
        title: "15.ai Error",
        description: "Failed to generate voice",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdgeTTS = async () => {
    if (!edgeText.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text for Edge TTS",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('edge-tts', {
        body: {
          text: edgeText,
          voice: edgeVoice,
        },
      });

      if (error) throw error;

      setResults(prev => ({
        ...prev,
        'edge-tts': data,
      }));

      // Play audio if available
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.play();
      }

      toast({
        title: "Edge TTS",
        description: "Speech generated successfully",
      });
    } catch (error) {
      console.error('Edge TTS error:', error);
      toast({
        title: "Edge TTS Error",
        description: "Failed to generate speech",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFictionLab = async () => {
    if (!fictionPrompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt for FictionLab",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fiction-lab', {
        body: {
          prompt: fictionPrompt,
          genre: fictionGenre,
          length: fictionLength,
        },
      });

      if (error) throw error;

      setResults(prev => ({
        ...prev,
        'fiction-lab': data,
      }));

      toast({
        title: "FictionLab",
        description: "Story generated successfully",
      });
    } catch (error) {
      console.error('FictionLab error:', error);
      toast({
        title: "FictionLab Error",
        description: "Failed to generate story",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-space-deep-blue/90 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Multi-AI Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            {aiServices.map((service) => (
              <Button
                key={service.id}
                variant={activeService === service.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 ${
                  activeService === service.id
                    ? 'bg-accent text-black'
                    : 'border-accent/50 text-accent hover:bg-accent/20'
                }`}
              >
                {service.icon}
                {service.name}
              </Button>
            ))}
          </div>

          <Tabs value={activeService} onValueChange={setActiveService}>
            {/* Janitor.ai */}
            <TabsContent value="janitor-ai" className="space-y-4">
              <div className="space-y-4">
                <Input
                  placeholder="Character ID (optional)"
                  value={janitorCharacter}
                  onChange={(e) => setJanitorCharacter(e.target.value)}
                  className="bg-space-blue border-gray-600 text-white"
                />
                <Textarea
                  placeholder="Enter your message..."
                  value={janitorMessage}
                  onChange={(e) => setJanitorMessage(e.target.value)}
                  className="bg-space-blue border-gray-600 text-white min-h-[100px]"
                />
                <Button
                  onClick={handleJanitorAI}
                  disabled={isProcessing}
                  className="bg-accent hover:bg-accent/80 text-black"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Send Message'}
                </Button>
              </div>
            </TabsContent>

            {/* 15.ai */}
            <TabsContent value="fifteen-ai" className="space-y-4">
              <div className="space-y-4">
                <Select value={fifteenVoice} onValueChange={setFifteenVoice}>
                  <SelectTrigger className="bg-space-blue border-gray-600 text-white">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilight_sparkle">Twilight Sparkle</SelectItem>
                    <SelectItem value="rainbow_dash">Rainbow Dash</SelectItem>
                    <SelectItem value="pinkie_pie">Pinkie Pie</SelectItem>
                    <SelectItem value="fluttershy">Fluttershy</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={fifteenEmotion} onValueChange={setFifteenEmotion}>
                  <SelectTrigger className="bg-space-blue border-gray-600 text-white">
                    <SelectValue placeholder="Select emotion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="happy">Happy</SelectItem>
                    <SelectItem value="sad">Sad</SelectItem>
                    <SelectItem value="angry">Angry</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Enter text to synthesize..."
                  value={fifteenText}
                  onChange={(e) => setFifteenText(e.target.value)}
                  className="bg-space-blue border-gray-600 text-white min-h-[100px]"
                />
                <Button
                  onClick={handleFifteenAI}
                  disabled={isProcessing}
                  className="bg-accent hover:bg-accent/80 text-black"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Generating...' : 'Generate Voice'}
                </Button>
              </div>
            </TabsContent>

            {/* Edge TTS */}
            <TabsContent value="edge-tts" className="space-y-4">
              <div className="space-y-4">
                <Select value={edgeVoice} onValueChange={setEdgeVoice}>
                  <SelectTrigger className="bg-space-blue border-gray-600 text-white">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US-AriaNeural">Aria (US Female)</SelectItem>
                    <SelectItem value="en-US-JennyNeural">Jenny (US Female)</SelectItem>
                    <SelectItem value="en-US-GuyNeural">Guy (US Male)</SelectItem>
                    <SelectItem value="en-US-DavisNeural">Davis (US Male)</SelectItem>
                    <SelectItem value="en-GB-SoniaNeural">Sonia (UK Female)</SelectItem>
                    <SelectItem value="en-GB-RyanNeural">Ryan (UK Male)</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Enter text for speech synthesis..."
                  value={edgeText}
                  onChange={(e) => setEdgeText(e.target.value)}
                  className="bg-space-blue border-gray-600 text-white min-h-[100px]"
                />
                <Button
                  onClick={handleEdgeTTS}
                  disabled={isProcessing}
                  className="bg-accent hover:bg-accent/80 text-black"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Generating...' : 'Generate Speech'}
                </Button>
              </div>
            </TabsContent>

            {/* FictionLab */}
            <TabsContent value="fiction-lab" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select value={fictionGenre} onValueChange={setFictionGenre}>
                    <SelectTrigger className="bg-space-blue border-gray-600 text-white">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={fictionLength} onValueChange={setFictionLength}>
                    <SelectTrigger className="bg-space-blue border-gray-600 text-white">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Enter your story prompt..."
                  value={fictionPrompt}
                  onChange={(e) => setFictionPrompt(e.target.value)}
                  className="bg-space-blue border-gray-600 text-white min-h-[100px]"
                />
                <Button
                  onClick={handleFictionLab}
                  disabled={isProcessing}
                  className="bg-accent hover:bg-accent/80 text-black"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Generating...' : 'Generate Story'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Results Display */}
          {results[activeService] && (
            <Card className="mt-6 bg-space-blue border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-sm">Results</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap overflow-auto max-h-[300px]">
                  {JSON.stringify(results[activeService], null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};