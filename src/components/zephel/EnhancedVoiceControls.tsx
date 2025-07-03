
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Settings, 
  Plus,
  Play,
  Headphones,
  Waves
} from 'lucide-react';
import { useElevenLabsVoice } from '@/hooks/useElevenLabsVoice';
import { useToast } from '@/hooks/use-toast';

interface EnhancedVoiceControlsProps {
  onVoiceToggle?: (enabled: boolean) => void;
  voiceEnabled?: boolean;
}

// Popular ElevenLabs voices
const POPULAR_VOICES = [
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel (Sophisticated Male)' },
  { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria (Female)' },
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger (Male)' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Female)' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Male)' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte (Female)' },
];

export const EnhancedVoiceControls: React.FC<EnhancedVoiceControlsProps> = ({
  onVoiceToggle,
  voiceEnabled = false
}) => {
  const { agents, isLoading, createAgent, textToSpeech } = useElevenLabsVoice();
  const { toast } = useToast();
  
  const [showAgentCreator, setShowAgentCreator] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentPrompt, setNewAgentPrompt] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('onwK4e9ZLuTAKqWW03F9');
  const [testText, setTestText] = useState('Hello, this is a test of the ZEPHEL voice system.');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCreateAgent = useCallback(async () => {
    if (!newAgentName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the voice agent.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createAgent({
        name: newAgentName,
        prompt: newAgentPrompt || undefined,
        voice_id: selectedVoice,
        language: 'en'
      });
      
      // Reset form
      setNewAgentName('');
      setNewAgentPrompt('');
      setShowAgentCreator(false);
    } catch (error) {
      // Error already handled in hook
    }
  }, [newAgentName, newAgentPrompt, selectedVoice, createAgent, toast]);

  const handleTestVoice = useCallback(async () => {
    if (!testText.trim()) return;

    try {
      setIsPlaying(true);
      await textToSpeech(testText, selectedVoice);
    } catch (error) {
      // Error already handled in hook
    } finally {
      setIsPlaying(false);
    }
  }, [testText, selectedVoice, textToSpeech]);

  return (
    <div className="space-y-4">
      {/* Main Voice Controls */}
      <Card className="bg-space-deep-blue/90 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            Enhanced Voice Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Voice Test Section */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Voice Test</Label>
            <div className="space-y-2">
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {POPULAR_VOICES.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id} className="text-white">
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Enter text to test voice..."
                className="bg-gray-800 border-gray-600 text-white text-xs"
                rows={2}
              />
              
              <Button
                onClick={handleTestVoice}
                disabled={isPlaying || !testText.trim()}
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-3 h-3 mr-2" />
                {isPlaying ? 'Playing...' : 'Test Voice'}
              </Button>
            </div>
          </div>

          {/* Agent Management */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-400">Voice Agents ({agents.length})</Label>
              <Button
                onClick={() => setShowAgentCreator(!showAgentCreator)}
                size="sm"
                variant="outline"
                className="border-gray-600 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Create
              </Button>
            </div>

            {/* Agent List */}
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {agents.map((agent) => (
                <div
                  key={agent.agent_id}
                  className="bg-gray-800/50 border border-gray-600 rounded p-2"
                >
                  <div className="text-xs text-white font-medium">{agent.name}</div>
                  <div className="text-xs text-gray-400">
                    Voice: {POPULAR_VOICES.find(v => v.id === agent.voice_id)?.name || 'Custom'}
                  </div>
                </div>
              ))}
              
              {agents.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-2">
                  No agents created yet
                </div>
              )}
            </div>

            {/* Agent Creator */}
            {showAgentCreator && (
              <div className="space-y-2 p-3 bg-gray-800/30 border border-gray-600 rounded">
                <Input
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="Agent name (e.g., ZEPHEL Assistant)"
                  className="bg-gray-800 border-gray-600 text-white text-xs"
                />
                
                <Textarea
                  value={newAgentPrompt}
                  onChange={(e) => setNewAgentPrompt(e.target.value)}
                  placeholder="Custom prompt (optional)"
                  className="bg-gray-800 border-gray-600 text-white text-xs"
                  rows={3}
                />
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateAgent}
                    disabled={isLoading || !newAgentName.trim()}
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? 'Creating...' : 'Create Agent'}
                  </Button>
                  <Button
                    onClick={() => setShowAgentCreator(false)}
                    size="sm"
                    variant="outline"
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Voice Interface Toggle */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Interface Status</Label>
            <Button
              onClick={() => onVoiceToggle?.(!voiceEnabled)}
              variant={voiceEnabled ? "default" : "outline"}
              size="sm"
              className={`w-full ${
                voiceEnabled 
                  ? 'bg-accent hover:bg-accent/80 text-black' 
                  : 'border-accent/50 text-accent hover:bg-accent/20'
              }`}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 mr-2" />
                  Voice Interface Enabled
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 mr-2" />
                  Voice Interface Disabled
                </>
              )}
            </Button>
          </div>

          {/* Status Information */}
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <Waves className="w-3 h-3" />
              <span>Real-time voice conversation</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-3 h-3" />
              <span>Live speech transcription</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-3 h-3" />
              <span>Advanced speech synthesis</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
