import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MicOff } from 'lucide-react';

export const VoiceInterfaceStatus: React.FC = () => {
  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <MicOff className="w-4 h-4 text-red-400" />
          Voice Interface - DISABLED
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-xs">
          ElevenLabs voice agent has been disabled. Text-only interface active.
        </p>
      </CardContent>
    </Card>
  );
};