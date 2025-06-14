import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from 'lucide-react';

interface SystemCommandsProps {
  commands: string[];
  onCommandSelect: (command: string) => void;
}

export const SystemCommands: React.FC<SystemCommandsProps> = ({ 
  commands, 
  onCommandSelect 
}) => {
  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Network className="w-4 h-4" />
          Commands
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {commands.map((command, index) => (
          <button
            key={index}
            onClick={() => onCommandSelect(command)}
            className="w-full text-left p-2 text-xs font-mono text-gray-300 bg-black/20 hover:bg-black/40 rounded border border-gray-800 hover:border-accent/50 transition-colors"
          >
            {command}
          </button>
        ))}
      </CardContent>
    </Card>
  );
};