import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from 'lucide-react';

interface ConfigurationPanelProps {
  config: {
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
  };
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ config }) => {
  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Simulation Parameters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-gray-400">Temperature</span>
            <div className="text-accent font-mono">{config.temperature}</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">Top P</span>
            <div className="text-accent font-mono">{config.top_p}</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">Freq Penalty</span>
            <div className="text-accent font-mono">{config.frequency_penalty}</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">Presence Penalty</span>
            <div className="text-accent font-mono">{config.presence_penalty}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};