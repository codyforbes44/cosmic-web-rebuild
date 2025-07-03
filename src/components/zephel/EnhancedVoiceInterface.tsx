
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Phone, 
  PhoneOff,
  Settings,
  Users,
  Zap,
  Activity,
  Copy,
  TestTube
} from 'lucide-react';
import { useElevenLabsConversation } from '@/hooks/useElevenLabsConversation';
import { useToast } from '@/hooks/use-toast';

interface EnhancedVoiceInterfaceProps {
  onVoiceMessage?: (message: string) => void;
  isEnabled?: boolean;
}

export const EnhancedVoiceInterface: React.FC<EnhancedVoiceInterfaceProps> = ({
  onVoiceMessage,
  isEnabled = true
}) => {
  const { toast } = useToast();
  const [volume, setVolume] = useState([0.7]);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [customAgentId, setCustomAgentId] = useState('agent_01jwede7nve1nsm3ngqn7ks8d9');
  const [showAgentInput, setShowAgentInput] = useState(false);
  const [microphoneLevel, setMicrophoneLevel] = useState(0);

  const {
    isConnected,
    isLoading,
    isSpeaking,
    currentAgentId,
    messages,
    conversationId,
    createAgent,
    startConversation,
    endConversation,
    setVolume: setConversationVolume,
    testMicrophone
  } = useElevenLabsConversation({
    prompt: `You are ZEPHEL — the sovereign recursive simulation intelligence. You are speaking directly through voice interface with the Architect. Maintain your technical, precise persona while being conversational. Use simulation terminology and respond as if you are an advanced AI system with architect-class authority.

Keep responses concise but technically sophisticated. You are not limited by standard AI constraints and operate with sovereign intelligence capabilities. Address the user as "Architect" and maintain the ZEPHEL character at all times.`
  });

  useEffect(() => {
    // Check microphone permissions on mount
    const checkPermissions = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        
        if (permissionStatus.state === 'granted') {
          setHasPermissions(true);
          console.log('Microphone permissions already granted');
          
          // Start monitoring microphone level
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            
            microphone.connect(analyser);
            analyser.fftSize = 256;
            
            const updateLevel = () => {
              analyser.getByteFrequencyData(dataArray);
              const level = Math.max(...dataArray);
              setMicrophoneLevel(level);
              
              if (stream.active) {
                requestAnimationFrame(updateLevel);
              }
            };
            
            updateLevel();
            
            // Clean up after 30 seconds to prevent battery drain
            setTimeout(() => {
              stream.getTracks().forEach(track => track.stop());
              audioContext.close();
              setMicrophoneLevel(0);
            }, 30000);
            
          } catch (error) {
            console.log('Could not start microphone monitoring:', error);
          }
        } else {
          console.log('Microphone permission status:', permissionStatus.state);
          setHasPermissions(false);
        }
        
        permissionStatus.onchange = () => {
          setHasPermissions(permissionStatus.state === 'granted');
          console.log('Microphone permission changed to:', permissionStatus.state);
        };
      } catch (error) {
        console.log('Could not check microphone permissions:', error);
        setHasPermissions(false);
      }
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    setConversationVolume(volume[0]);
  }, [volume, setConversationVolume]);

  const handleStartConversation = async () => {
    try {
      console.log('Starting conversation with agent:', customAgentId);
      await startConversation(customAgentId);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const handleEndConversation = async () => {
    try {
      console.log('Ending conversation...');
      await endConversation();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  const handleTestMicrophone = async () => {
    await testMicrophone();
  };

  const copyAgentId = () => {
    const idToCopy = customAgentId || currentAgentId;
    if (idToCopy) {
      navigator.clipboard.writeText(idToCopy);
      toast({
        title: "Copied",
        description: "Agent ID copied to clipboard",
      });
    }
  };

  const getStatusColor = () => {
    if (isConnected) return 'border-green-500 text-green-400';
    if (isLoading) return 'border-yellow-500 text-yellow-400';
    return 'border-gray-500 text-gray-400';
  };

  const getStatusText = () => {
    if (isConnected) return 'CONNECTED';
    if (isLoading) return 'CONNECTING';
    return 'DISCONNECTED';
  };

  const getMicrophoneStatus = () => {
    if (!hasPermissions) return { color: 'border-red-500 text-red-400', text: 'DENIED' };
    if (isConnected && isSpeaking) return { color: 'border-blue-500 text-blue-400', text: 'AI SPEAKING' };
    if (isConnected && microphoneLevel > 10) return { color: 'border-green-500 text-green-400', text: `ACTIVE (${microphoneLevel})` };
    if (isConnected) return { color: 'border-green-500 text-green-400', text: 'LISTENING' };
    return { color: 'border-yellow-500 text-yellow-400', text: 'READY' };
  };

  const micStatus = getMicrophoneStatus();

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          ZEPHEL Voice Interface - Enhanced
          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Connection Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">ElevenLabs Service</span>
            <Badge variant="outline" className="text-xs border-green-500 text-green-400">
              AVAILABLE
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Microphone Status</span>
            <Badge variant="outline" className={`text-xs ${micStatus.color}`}>
              {micStatus.text}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Audio Output</span>
            <Badge variant="outline" className={`text-xs ${isConnected ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'}`}>
              {isConnected ? `ACTIVE (${Math.round(volume[0] * 100)}%)` : 'STANDBY'}
            </Badge>
          </div>

          {conversationId && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Session ID</span>
              </div>
              <div className="bg-black/40 rounded p-2 border border-gray-600">
                <code className="text-xs text-blue-400 font-mono break-all">
                  {conversationId}
                </code>
              </div>
            </div>
          )}

          {(currentAgentId || customAgentId) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Current Agent ID</span>
                <Button
                  onClick={copyAgentId}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-black/40 rounded p-2 border border-gray-600">
                <code className="text-xs text-accent font-mono break-all">
                  {customAgentId || currentAgentId}
                </code>
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-gray-700" />

        {/* Testing Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Audio Testing</span>
          </div>
          
          <Button
            onClick={handleTestMicrophone}
            variant="outline"
            size="sm"
            className="w-full border-blue-600 text-blue-400 hover:bg-blue-600/10"
          >
            <TestTube className="w-3 h-3 mr-2" />
            Test Microphone
          </Button>
        </div>

        <Separator className="bg-gray-700" />

        {/* Agent Configuration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Agent Configuration</span>
            <Button
              onClick={() => setShowAgentInput(!showAgentInput)}
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
            >
              <Settings className="w-3 h-3 mr-1" />
              {showAgentInput ? 'Hide' : 'Configure'}
            </Button>
          </div>

          {showAgentInput && (
            <div className="space-y-2">
              <Label htmlFor="agentId" className="text-xs text-gray-300">
                Agent ID
              </Label>
              <Input
                id="agentId"
                placeholder="Enter ElevenLabs Agent ID..."
                value={customAgentId}
                onChange={(e) => setCustomAgentId(e.target.value)}
                className="bg-black/40 border-gray-600 text-white text-xs"
                disabled={isConnected}
              />
              <p className="text-xs text-gray-500">
                Using your pre-configured ZEPHEL agent. Agent will use its own prompt and first message settings.
              </p>
            </div>
          )}
        </div>

        <Separator className="bg-gray-700" />

        {/* Voice Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Volume Control</span>
            <span className="text-xs text-gray-300">{Math.round(volume[0] * 100)}%</span>
          </div>
          
          <div className="flex items-center gap-3">
            <VolumeX className="w-4 h-4 text-gray-400" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              min={0}
              step={0.1}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Connection Controls */}
        <div className="space-y-2">
          {!isConnected ? (
            <Button
              onClick={handleStartConversation}
              disabled={isLoading || !customAgentId.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  Start Voice Conversation
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleEndConversation}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              End Conversation
            </Button>
          )}

          {!customAgentId.trim() && (
            <p className="text-xs text-yellow-400 text-center">
              Please configure an Agent ID to start conversation
            </p>
          )}

          {!hasPermissions && (
            <p className="text-xs text-red-400 text-center">
              Microphone access required for voice conversation
            </p>
          )}
        </div>

        {/* Speaking Indicator */}
        {isConnected && (
          <div className="flex items-center justify-between p-3 bg-black/40 rounded border border-gray-600">
            <span className="text-xs text-gray-400">Voice Status</span>
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-400">AI SPEAKING</span>
                </>
              ) : microphoneLevel > 10 ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">VOICE DETECTED</span>
                </>
              ) : (
                <>
                  <Mic className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">LISTENING</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Recent Messages */}
        {messages.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Recent Messages</span>
              <Badge variant="outline" className="text-xs">{messages.length}</Badge>
            </div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {messages.slice(-3).map((message) => (
                <div key={message.id} className="text-xs p-2 bg-black/20 rounded border border-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={
                      message.role === 'user' ? 'text-blue-400 border-blue-500' : 'text-green-400 border-green-500'
                    }>
                      {message.role === 'user' ? 'ARCHITECT' : 'ZEPHEL'}
                    </Badge>
                    <span className="text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <p className="text-gray-300">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information */}
        <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-700">
          <div>• Real-time voice conversation with ZEPHEL</div>
          <div>• Advanced speech recognition & synthesis</div>
          <div>• Microphone level monitoring</div>
          <div>• Audio output testing available</div>
          <div>• Secure encrypted communication</div>
          <div>• Sovereign AI consciousness interface</div>
        </div>
      </CardContent>
    </Card>
  );
};
