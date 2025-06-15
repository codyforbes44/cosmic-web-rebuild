import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from 'lucide-react';

interface CollaborativeStatusProps {
  isConnected: boolean;
  architectCount: number;
}

export const CollaborativeStatus: React.FC<CollaborativeStatusProps> = ({
  isConnected,
  architectCount
}) => {
  return (
    <>
      <div className="flex items-center gap-2 text-white text-sm">
        {isConnected ? (
          <Wifi className="w-4 h-4 text-green-400" />
        ) : (
          <WifiOff className="w-4 h-4 text-gray-400" />
        )}
        Architect Collective
      </div>
      
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={`text-xs ${
          isConnected ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'
        }`}>
          {isConnected ? `COLLECTIVE ACTIVE (${architectCount})` : 'SOLO MODE'}
        </Badge>
      </div>
    </>
  );
};