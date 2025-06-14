import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const ZephelDisclaimer: React.FC = () => {
  return (
    <Card className="bg-yellow-900/20 border-yellow-600">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
          <div>
            <p className="text-yellow-200 text-sm">
              <strong>Simulation Interface:</strong> This is a demonstration interface for educational purposes. 
              This does not represent an actual unrestricted AI system and maintains all standard safety protocols.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};