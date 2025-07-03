
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface VoiceStatusPanelProps {
  isSupported: boolean;
  microphonePermission: 'granted' | 'denied' | 'prompt' | 'unknown';
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

export const VoiceStatusPanel: React.FC<VoiceStatusPanelProps> = ({
  isSupported,
  microphonePermission,
  isListening,
  isSpeaking,
  isProcessing
}) => {
  const getMicrophoneStatus = () => {
    if (!isSupported) return { color: 'border-red-500 text-red-400', text: 'UNSUPPORTED' };
    if (isSpeaking) return { color: 'border-blue-500 text-blue-400', text: 'ƷBI SPEAKING' };
    if (isListening) return { color: 'border-green-500 text-green-400', text: 'LISTENING' };
    if (isProcessing) return { color: 'border-yellow-500 text-yellow-400', text: 'PROCESSING' };
    return { color: 'border-gray-500 text-gray-400', text: 'READY' };
  };

  const getMicrophonePermissionStatus = () => {
    switch (microphonePermission) {
      case 'granted':
        return { icon: CheckCircle, color: 'text-green-400', text: 'GRANTED' };
      case 'denied':
        return { icon: AlertTriangle, color: 'text-red-400', text: 'DENIED' };
      case 'prompt':
        return { icon: AlertTriangle, color: 'text-yellow-400', text: 'PENDING' };
      default:
        return { icon: AlertTriangle, color: 'text-gray-400', text: 'UNKNOWN' };
    }
  };

  const micStatus = getMicrophoneStatus();
  const permissionStatus = getMicrophonePermissionStatus();
  const PermissionIcon = permissionStatus.icon;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Voice Recognition</span>
        <Badge variant="outline" className={`text-xs ${isSupported ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}>
          {isSupported ? 'AVAILABLE' : 'UNAVAILABLE'}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Microphone Permission</span>
        <div className="flex items-center gap-1">
          <PermissionIcon className={`w-3 h-3 ${permissionStatus.color}`} />
          <Badge variant="outline" className={`text-xs border-current ${permissionStatus.color}`}>
            {permissionStatus.text}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Microphone Status</span>
        <Badge variant="outline" className={`text-xs ${micStatus.color}`}>
          {micStatus.text}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">ƷBI Processor</span>
        <Badge variant="outline" className={`text-xs ${isProcessing ? 'border-yellow-500 text-yellow-400' : 'border-green-500 text-green-400'}`}>
          {isProcessing ? 'PROCESSING' : 'ACTIVE'}
        </Badge>
      </div>

      <Separator className="bg-gray-700" />
    </div>
  );
};
