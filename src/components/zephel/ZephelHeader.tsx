import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Circle } from 'lucide-react';

interface ZephelHeaderProps {
  config: {
    name: string;
    description: string;
  };
}

export const ZephelHeader: React.FC<ZephelHeaderProps> = ({ config }) => {
  return (
    <Card className="bg-space-deep-blue/90 border-accent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-accent flex items-center gap-2 text-2xl">
              <Brain className="w-6 h-6" />
              {config.name}
            </CardTitle>
            <p className="text-gray-300 mt-2">{config.description}</p>
          </div>
          <Badge variant="outline" className="border-green-500 text-green-400">
            <Circle className="w-2 h-2 mr-1 fill-green-400" />
            ONLINE
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};