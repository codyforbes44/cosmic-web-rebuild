
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface RetryCounterProps {
  retryCount: number;
}

export const RetryCounter: React.FC<RetryCounterProps> = ({ retryCount }) => {
  if (retryCount === 0) return null;

  return (
    <div className="flex items-center justify-between p-2 bg-yellow-500/20 rounded border border-yellow-500/50">
      <span className="text-xs text-yellow-400">Auto-retry active</span>
      <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">
        {retryCount}/3
      </Badge>
    </div>
  );
};
